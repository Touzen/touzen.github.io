---
layout: post
title: Centered Multi-Column Tables in LaTeX
---
From time to time, I need to create tables in LaTeX. Increasingly, these tables have become more and more complex. On particular complexity that I've had to tackle a few times recently is how to create multi-column tables. There are many use-cases where you might want to do this. One specific case that I increasingly need to present in my papers is when we have NLP models trained on many different datasets and evaluated using multiple metrics, as in this example below:

![A table where a NER model for clinical entity recognition is evaluated on multiple versions of a dataset, reporting both precision, recall and F1 scores.]({{ site.url }}/images/latex-table.png){: .center-image }

I have had to create tables like these multiple times throughout my PhD studies, but I have always struggled to find a method that (a) doesn't feel like a "hack" and (b) consistently centers the columns on all rows. Until now, that is! The way to do this, it turns out, is to use the `\multirow` and `\multicolumn` commands from the `multirow` package. Here is an (abbreviated) example of how the table from the screenshot was created:

{% gist 0b6554c1b1f20e8e6f93f1646d492369 %}

Here is an explanation, by row:

1: We have 12 columns: one for the entity name, nine for the P/R/F1 for the dataset types, and two extra columns for prettier spacing. Leaving the last to ones out will make the midrules between the dataset type and the metrics continuous.

3: This `\multirow` command specifies that the text _Entity_ should span two rows. This centers this cell _vertically_.

4: The `\multicolumn` command on this and the two subsequent rows specifies that the cell should span _three_ columns and that the text should be _**c**entered_ based on the combined width of these columns. To accomodate the space between the midrules, there are empty columns after rows 4 and 5. The actual row in the table ends on row 6.

7: The `\cmidrule` commands insert the midrules between the dataset type and the metrics. The command accepts a range (e.g., `2-4`) which is the columns the should be divided with the midrule.

8: Because of the `\multirow` command on row 3, the first column is "empty", since it is already filled with the text _Entity_. The rest of this row is treated as if it were the first part of a normal row. The actual table row ends on row 10.

12: State the entity class and start the row.

13: List the first three metrics (for the _Original_ dataset) and insert an empty column. Rows 14 and 15 complete the row. The rest of the table just repeats the patterns of row 12 and rows 13 to 15.

That's it! I hope that whoever is reading this (most likely myself) will forgive the verbosity of the explanation, but I've found many guides that leave out too much of the details which makes it difficult to understand the solution. The key to me finally understanding how to adapt this for my work was realizing that the commands act on a _cell_ level. So, `\multirow` doesn't tell LaTeX to start a multirow environment but turns whatever is in the `{}` into a cell spanning however many rows (or columns for `\multicolumn`) you want.

My solution was mostly based on the information in [this blog post](https://texblog.org/2012/12/21/multi-column-and-multi-row-cells-in-latex-tables/).