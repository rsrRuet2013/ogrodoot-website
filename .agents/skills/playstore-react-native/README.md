# playstore-react-native

Agent skill to prepare and troubleshoot **React Native (bare workflow)** Android release builds for Google Play Store.

## What it covers

- Bare workflow vs Expo managed detection
- Upload keystore generation (PKCS12)
- Gradle signing configuration (Groovy DSL)
- ProGuard/R8 rules specific to React Native + Hermes
- Troubleshooting decision tree for build failures, release crashes, and Play Store rejections

## Install

```bash
npx skills add Tacuchi/playstore-react-native
```

## Compatibility

Works with any agent that supports the [Agent Skills](https://skills.sh/) standard, including:

- [Warp](https://www.warp.dev/)
- [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code)
- [Cursor](https://www.cursor.com/)
- [Windsurf](https://windsurf.com/)
- [GitHub Copilot](https://github.com/features/copilot)

## License

[MIT](LICENSE)
