---
title: "The Cloud Native Virus"
date: "2019-09-08"
published: true
tags: ["design", "cloud"]
---

Think about good application design.

You have good cohesion at different layers of abstraction, your code is flexible and adaptive.

At the very lowest level layer, the code is purely the concern of developers. It’s where all your tedious bit-twiddling happens that supports the layers above. Data storage, utility functions for string manipulation, I/O plumbing.

At the very highest level layer, this code is the concern of the business. It’s where your current business processes are codified, decisions that people used to make that are now made by the computers.

Now, somewhere in between, things begin to begin to shift from technical concerns to business concerns. If you use the Agile Testing Quadrants for guidance, you’ll have business facing tests above that line, and developer facing tests below that line.

Some people will thrive on the assurance that your business is functional, some people will thrive on the assurance that the code does what it was designed to do. Organization to organization, these sets of people may intersect to different degrees.

In my past experience, the infrastructure used to deliver the software has tended to be below that line.

I say tended to be, because the notion of a business managed “rules engine” would sometimes lift the orchestration of lower level code to the hands of a business user, often in a third-party tool outside your control.

Concerns raised by the use of commercial rules engines tend to centre around the weakening of the business domain model by fragmenting the business logic between regular code and rules.

I see this akin to fragmenting logic between regular code and database stored procedures, or regular code and a distant JavaScript-driven web front end.

We begin to lean more heavily on tests that must exercise actual infrastructure (a client browser, a database, a rules engine) in order to exercise business facing tests.

This pushes our tests upward along the “testing pyramid” and often results in the bitter “testing ice-cream cone” where tests no longer provide timely feedback on emergent problems.

So now let’s consider “microservices” and “cloud native”.

In my past experience, “microservices” tended to be a thing that remained under the developers’ control. If we needed to test a system of microservices that followed something like Martin’s “Interactor Pattern” (https://blog.cleancoder.com/uncle-bob/2011/11/22/Clean-Architecture.html) we would use a mock service locator harness, independent from the network fabric and delivery mechanisms.

In today’s cloud world, we’re delegating more and more infrastructure control to our cloud vendors. We move from Java Servlets or MVC WebMethods to AWS Lambdas or Azure Functions.

Until the past couple years, the level at which we did that tended to be below that line we drew between business facing and developer facing concerns. These infrastructure concerns were just those of the developers, or maybe developers and ops in a silo’d organization.

Let’s use the example of a state machine, a common way to model domain logic. This would typically be implemented in code, and we would have tests around it to validate behaviour within a particular state, and validate correct transition between states. The state machine would delegate to other code to do the actual work needed. We could test both the work and the orchestration of the work without reaching “out-of-process” to any other system, with appropriate test doubles.

Instead today, especially if you were working to be “cloud native”, you could use an AWS Step Function. A step function orchestrates several AWS Lambdas according to your declared state machine.

But now, like the commercial rules engine, those business decisions (state transitions, what gets called in each state) execute outside your control at AWS.

You can no longer test business facing functionality with the same level of process isolation.

Maybe the best you can do is turn this into a locally run integration test using AWS’ SAM cli and docker images that simulate what AWS will do on their network. Nanoseconds for function or method calls turn into milliseconds for http transactions between docker images and your computer.

I’m left thinking of the same concerns we heard around the notion of rules engines. A fragmented domain model, now coupled to a vendor.

Where before we achieved the declarative power of rules engines with shifts to functional programming techniques, I am unsure what kind of sand-bagging we can do as commercial cloud vendors eye our business logic and woo our developers to turn it over.

Maybe that’s pessimistic. I noticed the other day that I opened my AWS account in 2007. That’s 12 years now AWS has influenced my thinking on how infrastructure could evolve. I’ve delivered dozens of systems across it. I may be jaded.