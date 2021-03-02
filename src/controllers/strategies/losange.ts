import { ActionSchema, Context, ServiceBroker } from 'moleculer'
import { MoveToMessage } from '@nodetron/types/control/moveTo'
import Strategies from '@nodetron/types/task-manager/tasks/strategies'
import { state } from '../../models/state'

/**
 * This class is an example of the new way to create Strategies.
 * It is basic and needs to be improved !
 * call "MSB.losange" ' { "ids" : [1,2,3,4] }' (To try with npm run repl)
 */
export default class Losange extends Strategies {
  name = 'losange';

  public constructor(public ids: Array<number>) {
    super()
  }

  public static declaration: ActionSchema = {
    params: {
      ids: {
        type: 'array', items: 'number', min: 4, max: 4,
      },
    },
    handler(ctx: Context<{ ids: Array<number> }>): void {
      ctx.broker.logger.info('MoveToMessage Message received')
      state.assign.register(ctx.params.ids, new Losange(ctx.params.ids))
    },
  }

  compute(broker: ServiceBroker): boolean {
    void broker.call('control.moveTo', {
      id: this.ids[0],
      target: { x: -1, y: 0 },
      orientation: -3.14,
    } as MoveToMessage)

    void broker.call('control.moveTo', {
      id: this.ids[1],
      target: { x: 0, y: 1 },
      orientation: -3.14,
    } as MoveToMessage)

    void broker.call('control.moveTo', {
      id: this.ids[2],
      target: { x: 1, y: 0 },
      orientation: -3.14,
    } as MoveToMessage)

    void broker.call('control.moveTo', {
      id: this.ids[3],
      target: { x: 0, y: -1},
      orientation: -3.14,
    } as MoveToMessage)

    return true
  }
}
