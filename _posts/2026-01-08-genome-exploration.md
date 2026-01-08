---
layout:        post
title:         "Looking for anomalies in my MyHeritage DNA"
date:          2026-01-08 23:00:00 +0200
---

Back when genetic testing was starting to become trendy, and privacy concerns were not as prescient, I agreed to get my DNA analyzed by MyHeritage. The rest of my family and I were curious to see if we'd find any surprising information in the ethnic estimation. In the end, my main take-away was that being a mixed Swedish--Persian heritage apparently makes my DNA look Italian[^1]. I guess it makes sense, at least geographically.

Many years have passed, and MyHeritage is still holding on to my DNA. So, I thought I'd download it and see what I can do with the data. The first thing that comes to mind is, of course, to see if I have any rare genetic mutations! A brilliant idea for somebody who holds his breath when passing somebody coughing. In any case, the good (?) thing is that searching one's genome for anomalies is pretty easy and possible to do using open resources!

> Quick reality check: MyHeritage raw data is *SNP-chip genotyping*, not full genome sequencing. That means we can look for the clinically annotated variants that MyHeritage supports, but we’re not scanning *everything,* and results are not diagnostic.

If you want to download the data and install the software we'll be using *before* digging in, then here's a list of what you'll need:
- [Bcftools](https://samtools.github.io/bcftools/)
- [SnpSift](https://pcingola.github.io/SnpEff/download/)
- [GATK](https://github.com/broadinstitute/gatk/releases)
- [GRCh37 reference genome](ftp://ftp.ensembl.org/pub/grch37/current/fasta/homo_sapiens/dna/Homo_sapiens.GRCh37.dna.primary_assembly.fa.gz)
- [ClinVar](https://ftp.ncbi.nlm.nih.gov/pub/clinvar/vcf_GRCh37/clinvar_20260104.vcf.gz) and its [TBI file](https://ftp.ncbi.nlm.nih.gov/pub/clinvar/vcf_GRCh37/clinvar_20260104.vcf.gz.tbi)

# Converting our data to VCF

Needless to say, the first thing you need to download is your actual DNA data. In my case, since MyHeritage did the testing, this came in the form of a CSV file. Depending on which company processed your DNA, you may get your data in some other format. As long as you're *not* getting your data in the VCF format, your first step will be to convert the data. If, like me, you got your data from MyHeritage, you will first need to reformat it to be tab-separated. I also had to remove the comments at the start of the CSV file, but we'll need them for later!

```bash
head -12 MyHeritage_raw_dna_data.csv > headers.txt          # Save the headers for later
tail --lines=+13 MyHeritage_raw_dna_data.csv > dna_data.csv # Remove them from the CSV file
csvtool -t COMMA -u TAB cat dna_data.csv > dna_data.tsv     # Separate by tabs instead of commas
```

Next, we will perform the actual conversion. I used an open-source tool called [Bcftools](https://samtools.github.io/bcftools/). The VCF format actually stores data about genetic *variations*. Consequently, before we can create our VCF file, we'll need a reference genome to compare our data to. Here's where it might help to inspect the `headers.txt` file. If your data is from MyHeritage, you will find a line reading something like:

```
##reference=build37
```

This information tells you what genome you should use as a reference. In my case, it means I should use the [GRCh37 reference](ftp://ftp.ensembl.org/pub/grch37/current/fasta/homo_sapiens/dna/Homo_sapiens.GRCh37.dna.primary_assembly.fa.gz). Once this file has been downloaded, we can finally create our VCF file:

```bash
bcftools convert --tsv2vcf dna_data.tsv  -f Homo_sapiens.GRCh37.dna.primary_assembly.fa -s SampleName -Ov -o myvariants.vcf
```

# Searching for clinically relevant anomalies

Once you've created the VCF file, you're ready for the next, more interesting step. Let's find some clinically relevant but entirely non-actionable and possibly alarming genetic anomalies! Think carefully if this is *really* something you want to do. The end-result of this process is not very easy to parse and making sense of it involves searching through difficult-to-interpret medical research. You will very likely find something that at least *looks* alarming, and this post will *not* teach you how to actually interpret the results. Proceed at your own risk!

> An extra warning: Don't forget how this could affect your family! Sure, it's your own DNA but, DNA being DNA, you share large portions of it with your parents, siblings, and children. They have (probably) not consented to your exploration of the DNA you have in common. Take a moment to reflect on how anything you find might affect your loved ones, and think about how and if you would disclose anything you find.

Having established that you are either (1) a medical professional or (2) somebody with high self-confidence and/or poor judgement, we're ready to continue. The next step is to download another file, containing information about genetic variations and how they may affect your health: [ClinVar](https://ftp.ncbi.nlm.nih.gov/pub/clinvar/vcf_GRCh37/clinvar_20260104.vcf.gz). You will also need[^2] the associated so-called [TBI file](https://ftp.ncbi.nlm.nih.gov/pub/clinvar/vcf_GRCh37/clinvar_20260104.vcf.gz.tbi) for these next steps.

While you're downloading ClinVar, you might as well set up [SnpSift](https://pcingola.github.io/SnpEff/download/) which is the tool we'll be using to enrich our VCF file with the clinical information from ClinVar. Unzip the archive and run the following line:
```bash
java -jar ./snpEff/SnpSift.jar annotate clinvar_20260104.vcf.gz myvariants.vcf > myvariants.clinvar.vcf
```
This line will add the clinical information to our VCF file and produce a new version. Now, it's time to set up our final piece of software: [GATK](https://github.com/broadinstitute/gatk/releases). We'll be using this tool to convert our latest VCF file into a more human-readable tabular format. 

```bash
./gatk-4.6.2.0/gatk VariantsToTable -V myvariants.clinvar.vcf -F CHROM -F POS -F REF -F ALT -F ID -F ALLELEID -F CLNDN -F CLNSIG -F CLNVC -F GENEINFO -GF GT -GF GQ -GF AD -O myvariants.clinvar.tsv
```

If you want, you can stop here and explore the tab-separated CSV file using your spreadsheet processor of choice. However, the file contains *a lot* of data, much that isn't very interesting. In the next section, I'll show you how I filtered the data in Python to find variations that seemed worthwhile looking into.

# Filtering in Python
The way I did this was by (ab)using the Pandas library to filter out the relevant variations. There are probably *much* cleaner ways to do this, but here's how I did it. First, open a Jupyter Notebook. The first cell loads the data into pandas:

```python
import pandas as pd

df = pd.read_csv(
    'myvariants.clinvar.tsv',
    sep='\t',
    comment = '#',
)
df['ID'] = df['ID'].apply(lambda i: i.split(';')[0])
df.head()
```

| | CHROM | POS | REF | ALT | ID | ALLELEID | CLNDN | CLNSIG | CLNVC | GENEINFO | SampleName.GT | SampleName.GQ | SampleName.AD | 
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | 
| 0 | 1 | 72526 | A | . | rs547237130 | NaN | NaN | NaN | NaN | NaN | A/A | NaN | NaN | 
| 1 | 1 | 565703 | A | . | rs562180473 | NaN | NaN | NaN | NaN | NaN | A/A | NaN | NaN | 
| 2 | 1 | 567693 | T | . | rs575203260 | NaN | NaN | NaN | NaN | NaN | T/T | NaN | NaN | 
| 3 | 1 | 752721 | A | G | rs3131972 | NaN | NaN | NaN | NaN | NaN | G/G | NaN | NaN | 
| 4 | 1 | 752918 | G | . | rs200599638 | NaN | NaN | NaN | NaN | NaN | G/G | NaN | NaN | 

As you can see, a lot of the data isn't very interesting. Next, we'll filter it:

```python
# Split genotype alleles (handles A/A and A|A)
gt = df['SampleName.GT'].astype(str).str.replace('|', '/', regex=False).str.split('/', expand=True)
df['GT_a1'], df['GT_a2'] = gt[0], gt[1]

# Keep only rows where at least one allele differs from REF (i.e., you carry ALT or something non-REF)
nonref = (df['GT_a1'] != df['REF']) | (df['GT_a2'] != df['REF'])

# Now apply your clinical-significance filtering on top
sig = df['CLNSIG'].fillna('')
interesting_sig = (
    sig.ne('') &
    ~sig.str.startswith(('Conflicting', 'Uncertain'), na=False) &
    ~sig.str.contains(r'benign|not_provided', case=False, regex=True, na=False) 
)

df_interesting = df[nonref & interesting_sig].copy()

df_interesting['url'] = df_interesting['ID'].apply(lambda i: f'http://www.snpedia.com/index.php/{i}')
df_interesting['clinvar_url'] = df_interesting['ALLELEID'].apply(
    lambda a: f'https://www.ncbi.nlm.nih.gov/clinvar/variation/{int(a)}/'
)

df_interesting.to_csv('findings.tsv', sep='\t', index=False)
```

This produces a new CSV file that also contains links to the SNPedia website where you can find information about the variations. However, be aware that many of the pages may be empty, difficult to understand or contain very little information. You can usually find some additional information directly from ClinVar, and there are links for that too.

That's it! You can, of course, continue exploring the data in Jupyter Notebook. This is just where I ended my exploration, and proceeded to stare blankly at the incomprehensible data I extracted and might or might not need to feel worried about. Good luck!

# Sources and inspiration

- https://samtools.github.io/bcftools/howtos/convert.html
- 
- https://bioinformatics.stackexchange.com/questions/15360/how-can-i-use-my-myheritage-dna-results-file-for-further-analysis
- 
- https://www.biostars.org/p/374149/
- 
- https://pcingola.github.io/SnpEff/download/
- 
- https://joemcgirr.github.io/files/code_tutorials/my_genome/SnpEFF.html
- 
- https://github.com/broadinstitute/gatk/releases
- 
- https://www.biostars.org/p/9495084/

# Footnotes

[^1]: This explains a hilarious interaction I had at one of my first scientific conferences. At the welcome reception, another PhD student came up to me and---without introducing himself---exclaimed that I was the most Italian person he'd ever seen!

[^2]: Some of the guides I followed did not mention this file. I'm not completely sure why this is the case, but the file apparently provides an index which is missing from the version of ClinVar I had downloaded.