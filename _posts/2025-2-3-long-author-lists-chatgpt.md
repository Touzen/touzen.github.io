---
layout: post
title: Long author lists in the ACL LaTeX template (and how ChatGPT didn't help)
---

I am writing a paper where I am including a citation to the BLOOM paper. This paper has a very, very long author list. While I want to give everyone credit, including the paper _as is_ means that this entry of the bibliography spans more than a page. What to do?

The ACL template uses `natbib` which relies on `.bst` files for styling the bibliographical information. These files are quite difficult to read. I found [a manual online](https://ctan.org/pkg/tamethebeast) that made me want to cry. Polish notation is fine (not really) but really painful when deeply nested.

For anyone (probably me) wondering how I solved this problem: good news! There is absolutely no need to edit the `.bst` file. The implementation in `acl_natbib.bst` allows you to add an "others" author that will get rendered as "et al." So go ahead and do so (I couldn't find this documented anywhere online).

In case you are interested in why I'm mentioning ChatGPT in the title, this is because I tried to use it to fix the problem. This interaction, I think, highlights one big flaw of LLM chatbots (in early 2025).

# ChatGPT (not) to the rescue
Using LLMs for writing code means that you hand over a lot of responsibility to a non-thinking machine. Generally, this feels like a bad idea. But, for me, there's another big reason for not doing this: I actually enjoy programming. However, this love does not (yet?) extend to whatever language `.bst` files are written in.

So in an effort to fix my problem and to try not to be such a luddite, I turned to ChatGPT with my problem[^1]. I prompted it with this:

> I am trying to modify the acl_natbib.bst file in the default LaTeX bundle for ACL papers. I want to change it so that it can handle very long author lists when producing the bibliography. The fixed version should truncate the author list when there are more than 9 authors and replace the extra authors with "et al.".

And in response I got a response in the typical overly-cheerful and manically helpful tone:

> To modify acl_natbib.bst so that it truncates author lists with more than 9 authors and replaces the extra ones with "et al.", follow these steps:
>
>### 1. Locate the `acl_natbib.bst` file
>    This file is typically found in your LaTeX installation's `texmf` directory or in the directory where your paper is stored.
>### 2. Modify the `format.names` function.
>    The `format.names` function controls how author names are formatted. You need to modify it to check the number of authors and truncate the list if it exceeds 9.
>### 3. Edit the Function to Truncate Long Author Lists.
>    Open `acl_natbib.bst` in a text editor and look for the function that formats author names, typically called `format.names`. Modify it like this:
>```    FUNCTION {format.names}
>  { 's :=
>    #1 'nameptr :=
>    s num.names 'numnames :=
>    numnames #9 >
>      { #1 #9 { s nameptr #1 + numnames min pick nameptr 'nameptr := } for
>        " et al." * }
>      { #1 numnames { s nameptr #1 + numnames min pick nameptr 'nameptr := } for }
>    if
>}
>```
>    This modification ensures that if there are more than 9 authors, only the first 9 are printed, followed by "et al."
>### 4. Compile and Test
>    Save the file and recompile your LaTeX document to verify that the change takes effect.
>If you need further adjustments, such as different truncation rules, let me know!

Did this work? Not at all! It broke the bibliography to list _no authors_. I gave it another go by sharing this and then realized it would be better to share the actual code. While I got closer and closer to something that might work, it never worked quite right.

In the end, I took one hard look at the code (even though it was in Polish notation). That's when I saw that the rows:
```
t "others" =
{
    " " * bbl.etal *
}
```
... looked an awful lot like something that might fix my problem. I typed `natbib others` into Google and found [this Stack Overflow question](https://tex.stackexchange.com/questions/632904/adding-et-al-in-natbib-with-five-authors-if-the-citation-has-more-than-five-a) which suggested that this should work (it did).

So what? Why did this annoy me to the point where I wrote a blog post about it? Mixed in with the annoyance was the excitement of finding a really good example of why instruction-tuned LLMs frequently fail as assistants. I am 100% sure that, had I taken this problem to a _human_, they would have pointed out that editing the `.bst` file was _completely unnecessary_[^2].

To me, this interaction highlights to flaws in chat-style LLMs. They are _overly confident_ even when their solutions are wrong and they are unable to "think" outside the box. For example, I have never gotten a response asking me follow-up questions that could reveal that I was asking the wrong question. Here, the "right" response to my inquiry would be to ask what I wanted to accomplish and then point me towards the simple "others" solution. Instead, the model bases the response on the incorrect assumption that I am deeply commited to editing the `.bst` file and that this is a necessary premise to any possible solution. This behaviour is problematic, since when we are trying to solve a technical issue it's often the case that _asking the right question_ (which I wasn't) is half the work.

_PS. I tried asking ChatGPT to solve my problem without suggesting that I wanted to edit the `.bst` file. This resulted in an even worse response instructing me to edit the `.bst` file (with an obviously incorrect solution) and to add `natbib` to the project with options that are specific to Biblatex. DS._

[^1]: Full chat available [here](https://chatgpt.com/share/67a0edf6-8dbc-8008-a103-2c19bc068da4).
[^2]: Granted, I could have also just gotten [responses](https://www.reddit.com/r/LaTeX/comments/noel4e/how_to_adapt_bst_file_for_working_with_natbib/) asking me to stop using natbib and instead use Biblatex.