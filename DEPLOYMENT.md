# Deployment

The expected server checkout is:

```text
~/repositories/solusisurabaya
```

The website document root is:

```text
~/alurelab/solusisurabaya.com
```

The static document root should point to the repository checkout, or be synchronized from it after each update. Portfolio URLs are ordinary directory routes, for example `/portofolio/fashion/`.

The `photobox` project is Laravel source and must be deployed separately with PHP, Composer, an environment file, and its own document root at `public/`. Do not expose its project root as a static directory.
