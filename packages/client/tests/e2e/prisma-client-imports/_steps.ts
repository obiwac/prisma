import { $ } from 'zx'

import { executeSteps } from '../_utils/executeSteps'

void executeSteps({
  setup: async () => {
    await $`pnpm install`
    await $`pnpm prisma generate --schema prisma/custom-output.prisma`
    await $`pnpm prisma generate --schema prisma/default-output.prisma`
  },
  test: async () => {
    await $`pnpm test`

    await $`node -r esbuild-register src/default.ts`.quiet()
    await $`node -r esbuild-register src/dep.ts`.quiet()
    await $`node -r esbuild-register src/no-dep.ts`.quiet()
  },
  finish: async () => {
    await $`echo "done"`
  },
})
