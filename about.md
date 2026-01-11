---
layout: page
title: About
permalink: /about/
---

I'm a [PhD student](https://vakili.science) at the [Department of Computer and Systems Sciences](https://dsv.su.se) at [Stockholm University](https://www.su.se) where I am researching natural language processing and privacy preservation. I have previously worked in the software industry as mostly as a back-end developer and as a data engineer.

# Really? Is that all you are?

No, I'm also passionate about politics and have a background as an elected official for the Social Democrats. While most of my spare-time used to be consumed by this constructive urge to work for a better society, now all that energy has been directed towards ranting. :)

A lot of time is also spent geeking out about languages. My passion for natural languages goes beyond processing them using computers, I also like them irl! I'm always working on improving my Persian language skills (my second mother tongue after Swedish) or oversharing "fun facts" about phonetics and other exciting language features.

# An incomplete and compressed timeline
<div class="timeline">
    <!--Credit: https://dev.to/divyeshkamalanaban/making-a-simple-css-timeline-for-beginners-1ccg-->
    <div class="timeline-empty">
    </div>
    <div class="timeline-middle">
        <div class="timeline-circle"></div>
    </div>
    <div class="timeline-component timeline-content">
        <h2>Got my PhD</h2>
        <p>I will defend my thesis about privacy-preserving NLP on January 13, 2026.</p>
    </div>
    <div class="timeline-component timeline-content">
        <h2>Got engaged</h2>
        <p>In July 2025, I got engaged to Okra Livia.</p>
    </div>
    <div class="timeline-middle">
        <div class="timeline-circle"></div>
    </div>
    <div class="timeline-empty">
    </div>
    <div class="timeline-empty">
    </div>
    <div class="timeline-middle">
        <div class="timeline-circle"></div>
    </div>
    <div class=" timeline-component timeline-content">
        <h2>Research visit in Chile</h2>
        <p>In 2023, I got a scholarship to visit Assistant Professor Jocelyn Dunstan in Santiago.</p>
    </div>
    <div class="timeline-component timeline-content">
        <h2>Started my PhD</h2>
        <p>I started my PhD in February 2021.</p>
    </div>
    <div class="timeline-middle">
        <div class="timeline-circle"></div>
    </div>
    <div class="timeline-empty">
    </div>
    <div class="timeline-empty">
    </div>
    <div class="timeline-middle">
        <div class="timeline-circle"></div>
    </div>
    <div class="timeline-component timeline-content">
        <h2>Finished my engineering degree</h2>
        <p>In 2020, I got my engineering diploma and master's degree (civilingenjör).</p>
    </div>
    <div class="timeline-component timeline-content">
        <h2>Started working as a consultant</h2>
        <p>I started working at Netlight&mdash;a Swedish IT consultancy firm&mdash;in 2019.</p>
    </div>
    <div class="timeline-middle">
        <div class="timeline-circle"></div>
    </div>
    <div class="timeline-empty">
    </div>
    <div class="timeline-empty">
    </div>
    <div class="timeline-middle">
        <div class="timeline-circle"></div>
    </div>
    <div class="timeline-component timeline-content">
        <h2>Took a break from politics</h2>
        <p>After the election in 2019, I slowly started to scale back my political responsibilities.</p>
    </div>
</div>

<style>
.timeline {
  width: 80%;
  height: auto;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.timeline-content {
  padding: 20px;

  border-radius: 5px;
  color: white;
  transition: 0.4s ease;
  overflow-wrap: break-word !important;
  margin: 1rem;
  margin-bottom: 20px;
  border-radius: 6px;
}


.timeline-component {
  margin: 0px 20px 20px 20px;
}

@media screen and (min-width: 768px) {
  .timeline {
    display: grid;
    grid-template-columns: 1fr 3px 1fr;
  }
  .timeline-middle {
    position: relative;
    background-color: #63cd70;
    width: 3px;
    height: 100%;
  }
  .main-middle {
    opacity: 0;
  }
  .timeline-circle {
    position: absolute;
    top: 0;
    left: 50%;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #63cd70;
    transform: translate(-50%, 450%);

  }
    
    .timeline-content:nth-child(even) {
        text-align: right;
    }
}
</style>