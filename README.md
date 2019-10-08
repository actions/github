# GitHub Action for GitHub

This action conveniently wraps [actions-toolkit](https://github.com/JasonEtco/actions-toolkit), making it simple to do things like label, assign, and comment on issues on GitHub.

Here are a few use cases for this action:

## Applying a "triage" label on any new issue:

```yml
name: Triage
on:
  issues:
    types: [opened]
jobs:
  applyTriageLabel:
    name: Apply Triage Label
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: Apply Triage Label
        uses: actions/github@v1.0.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          args: label triage
```

## Commenting on an issue

```yml
name: Triage
on:
  issues:
    types: [opened]
jobs:
  commentOnNewIssues:
    name: Comment On New Issues
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: Comment On New Issues
        uses: actions/github@v1.0.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          args: comment "Hello World"
```

## Assigning any newly created issues

```yml
name: Triage
on:
  issues:
    types: [opened]
jobs:
  assignMonaLisa:
    name: Assign MonaLisa
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: Assign MonaLisa
        uses: actions/github@v1.0.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          args: assign @monalisaoctocat
```

## Contributing

Check out [this doc](CONTRIBUTING.md).

## License

This action is released under the [MIT license](LICENSE.md).
Container images built with this project include third party materials. See [THIRD_PARTY_NOTICE.md](THIRD_PARTY_NOTICE.md) for details.

## Current Status

This action is in active development.
