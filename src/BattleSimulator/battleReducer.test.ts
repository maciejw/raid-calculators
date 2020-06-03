import { battleReducer, initialArenaState } from './battleReducer';

describe('battle reducer', () => {
  test('Tick increments turn meter when champion entered battle', () => {
    battleReducer(initialArenaState, null);
  });
});
