#!/usr/bin/env bun

import { initProject } from '.'
import { finishSetup, getProjectName, processProjectName } from './helpers'

const main = async () => {
  let projectName = getProjectName()
  projectName = await processProjectName(projectName)

  await initProject(projectName)

  finishSetup(projectName)
}

if (import.meta.main) main()
