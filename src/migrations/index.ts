import * as migration_20251022_165841 from './20251022_165841';
import * as migration_20251022_172650 from './20251022_172650';

export const migrations = [
  {
    up: migration_20251022_165841.up,
    down: migration_20251022_165841.down,
    name: '20251022_165841',
  },
  {
    up: migration_20251022_172650.up,
    down: migration_20251022_172650.down,
    name: '20251022_172650'
  },
];
