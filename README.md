# GitHub Action for GitHub

This action conveniently wraps [actions-toolkit](https://github.com/JasonEtco/actions-toolkit), making it simple to do things like label, assign, and comment on issues on GitHub.

Here are a few use cases for this action:

## Applying a "triage" label on any new issue:

```workflow
workflow "Triage" {
  on = "issue"
  resolves = "Apply Triage Label"
}

action "Apply Triage Label" {
  uses = "actions/github@v1.0.0"
  args = "label triage --action=opened" # Only when issues are opened!
  secrets = ["GITHUB_TOKEN"]
}
```

## Commenting on an issue

```workflow
workflow "Triage" {
  on = "issue"
  resolves = "Comment On New Issues"
}

action "Comment On New Issues" {
  uses = "actions/github@v1.0.0"
  args = "comment "Hello World" --action=opened" # Only when issues are opened!
  secrets = ["GITHUB_TOKEN"]
}
```

## Assigning any newly created issues

```workflow
workflow "Triage" {
  on = "issue"
  resolves = "Assign MonaLisa"
}

action "Assign MonaLisa" {
  uses = "actions/github@v1.0.0"
  args = "assign @monalisaoctocat --action=opened" # Only when issues are opened!
  secrets = ["GITHUB_TOKEN"]
}
```

## Contributing

Check out [this doc](CONTRIBUTING.md).

## License

This action is released under the [MIT license](LICENSE.md).
Container images built with this project include third party materials. See [THIRD_PARTY_NOTICE.md](THIRD_PARTY_NOTICE.md) for details.

## Current Status

This action is in active development.
