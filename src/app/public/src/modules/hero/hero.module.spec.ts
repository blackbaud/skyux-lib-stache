import {
  expect
} from '@skyux-sdk/testing';

import { StacheHeroModule } from './hero.module';

describe('StacheHeroModule', () => {
  it('should export', () => {
    const exportedModule = new StacheHeroModule();
    expect(exportedModule).toBeDefined();
  });
});
