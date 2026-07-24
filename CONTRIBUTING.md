# Branching workflow

`main` → production, connected to Vercel once the site launches.
`dev` → integration branch. All feature work merges here first.

```
feature/<name>  --> dev  --> main
```

Rules (convention, not yet server-enforced — see note below):

- Never push directly to `main`. All changes reach `main` via a PR from `dev`.
- Only Blessing-Emmanuel merges `dev` → `main`.
- Feature branches merge into `dev` via PR (or direct push if you're the only one working on it).

> **Note:** GitHub branch protection rules require a paid plan (or a public repo) on this
> private org repo, so the above isn't enforced by GitHub yet — it's a team agreement.
> Revisit enabling real protection on `main` once the org upgrades or the repo's
> visibility changes.
