---
layout: post
title: Offline AI - Integrating Local LLMs with VSCode
image: img/continue-local-llm-integration/banner.jpg
author: Dushyant
date: 2025-05-15T14:00:00.000Z
tags: ["AI", "All"]
draft: false
---

# Introduction

In the age of AI, developers are increasingly looking for ways to integrate powerful language models into their workflows. While cloud-based solutions like OpenAI's GPT models are popular, there’s a growing demand for **offline, private, and fast alternatives**. This guide walks you through integrating a **locally running LLM** (DeepSeek R1 Distill LLaMA) with the [Continue](https://continue.dev) extension in Visual Studio Code.

---

## Why Offline Mode is Useful

Running AI models locally offers several advantages:

1. **Privacy**: Sensitive codebases and data never leave your machine, ensuring compliance with privacy policies and regulations.
2. **Speed**: Local models eliminate latency caused by network requests, providing near-instant responses.
3. **Cost Efficiency**: Avoid recurring API costs by leveraging your local hardware.
4. **Customization**: Fine-tune models to your specific needs without relying on external providers.
5. **Offline Access**: Work uninterrupted, even without an internet connection.

For developers who value control and independence, offline AI development is a game-changer.

---

The full details is on github at [continue-local-llm-integration](https://github.com/realrubberduckdev/continue-local-llm-integration).

## 🐳 Step 1: Run the LLM in Docker

To get started, you'll need to run the DeepSeek R1 Distill LLaMA model locally using Docker. This model is OpenAI-compatible and provides a robust foundation for offline AI development.

### Resources:
- [Run LLMs Locally with Docker: A Quickstart Guide to Model Runner](https://www.docker.com/blog/run-llms-locally/)
- [Turn Your Mac Into an AI Playground with Docker Model Runner](https://youtu.be/rGGZJT3ZCvo?si=ihU14pUpyw3gL0Zk)
- [deepseek-r1-distill-llama](https://hub.docker.com/r/ai/deepseek-r1-distill-llama)

### Steps:
1. Pull the DeepSeek model from Docker Hub.
2. Start the container and ensure it exposes an endpoint like:

   ```
   http://localhost:12434/engines/v1/chat/completions
   ```

3. Test the setup using the provided `test.ps1` script in this repository.

---

## 🧠 Step 2: Install the Continue Extension

The [Continue](https://marketplace.visualstudio.com/items?itemName=Continue.continue) extension for Visual Studio Code is a powerful tool that brings AI-assisted coding to your IDE. It supports OpenAI-compatible APIs, making it an ideal choice for integrating local LLMs.

### Installation:
1. Open Visual Studio Code.
2. Navigate to the Extensions Marketplace.
3. Search for "Continue" and install the extension.

---

## ⚙️ Step 3: Configure Continue

To connect the Continue extension to your locally running LLM, you’ll need to update its configuration.

1. Locate the `sample-config\config.yaml` file in this repository.
2. Copy the file to `%userprofile%/.continue` on your machine.
3. Update the configuration to point to your local LLM endpoint:

   ```yaml
   api_url: http://localhost:12434/engines/v1/chat/completions
   ```

---

## ⚽ Step 4: Start Coding with AI

Once everything is set up, you can start leveraging the power of local AI models directly in your IDE. The Continue extension provides features like code completion, refactoring suggestions, and more.

---

## Conclusion

By running models offline, you gain privacy, speed, and control over your development environment. Having said so, running models locally takes up a lot of resource, at least on my machine. Hopefully the experience is smoother on yours.

## Credits

Banner image from [BoliviaInteligente](https://unsplash.com/photos/a-close-up-of-a-computer-board-with-a-logo-on-it-jk_nkEXo4aY?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash)