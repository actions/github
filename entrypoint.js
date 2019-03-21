const {Toolkit} = require('actions-toolkit')

const tools = new Toolkit()

const commands = {
  assign: doAssign,
  comment: doComment,
  label: doLabel
}

const command = tools.arguments._[0]
if (process.env.DEBUG === 'true') debug()

commands[command](tools.arguments)
  .then(() => {
    tools.exit.success('action successful')
  })
  .catch(err => {
    tools.log.fatal(err)
    tools.exit.failure('action failed')
  })

/**
 * Apply an assignee to the issue in this action.
 *
 * ex. `args = 'assign @jclem'`
 */
async function doAssign() {
  filterAction(tools.arguments.action)
  const assignees = tools.arguments._.slice(1)
  tools.log.info('assign', assignees)
  return checkStatus(
    await tools.github.issues.addAssignees(tools.context.issue({assignees}))
  )
}

/**
 * Create a new comment on the issue in this action.
 *
 * ex. `args = 'comment Hello, world!'`
 */
async function doComment() {
  filterAction(tools.arguments.action)
  const body = tools.arguments._.slice(1).join(' ')
  tools.log.info('comment', body)
  return checkStatus(
    await tools.github.issues.createComment(tools.context.issue({body}))
  )
}

/**
 * Apply a label to the issue in this action.
 *
 * ex. `args = 'label bug'`
 */
async function doLabel() {
  filterAction(tools.arguments.action)
  const labels = tools.arguments._.slice(1)
  tools.log.info('label', labels)
  return checkStatus(
    await tools.github.issues.addLabels(tools.context.issue({labels}))
  )
}

function checkStatus(result) {
  if (result.status >= 200 && result.status < 300) {
    return result
  }

  tools.exit.failure(`Received status ${result.status} from API.`)
}

function filterAction(action) {
  if (!action) return

  if (tools.context.payload.action !== action) {
    tools.log.note(
      `Action "${
        tools.context.payload.action
      } does not match "${action}" from arguments.`
    )

    tools.exit.neutral()
  }
}

function debug() {
  tools.log.debug('Action', tools.context.action)
  tools.log.debug('Actor', tools.context.actor)
  tools.log.debug('Arguments', tools.arguments)
  tools.log.debug('Event', tools.context.event)
  tools.log.debug('Ref', tools.context.ref)
  tools.log.debug('Sha', tools.context.sha)
  tools.log.debug('Workflow', tools.context.workflow)
  if (process.env.DEBUG_PAYLOAD === 'true')
    tools.log.debug('Payload', tools.context.payload)
}
