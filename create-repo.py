#!/usr/bin/env python3
import os, sys, subprocess, requests

# 1) Grab your token from the environment
token = os.getenv("GITHUB_PAT")
if not token:
    print("❌ Set GITHUB_PAT env var before running.")
    sys.exit(1)

# 2) Create the repo on GitHub
repo_name = "pdf4ever-editor"
headers   = {"Authorization": f"token {token}"}
payload   = {"name": repo_name, "private": False}

res = requests.post("https://api.github.com/user/repos", json=payload, headers=headers)
if res.status_code not in (201,):
    print("❌ GitHub API error:", res.json())
    sys.exit(1)
print(f"✅ GitHub repo created: https://github.com/your-username/{repo_name}")

# 3) Push your local scaffold up
#    (assumes you've unpacked the zip under ~/pdf4ever-editor and cd’ed there)
subprocess.check_call(["git", "init"])
subprocess.check_call(["git", "checkout", "-b", "main"])
subprocess.check_call(["git", "add", "."])
subprocess.check_call(["git", "commit", "-m", "Initial commit"])
subprocess.check_call(["git", "remote", "add", "origin",
    f"https://{token}@github.com/your-username/{repo_name}.git"])
subprocess.check_call(["git", "push", "-u", "origin", "main"])
print("🚀 Code pushed to GitHub!")
