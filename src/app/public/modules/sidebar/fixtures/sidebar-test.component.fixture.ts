import {
  Component,
  Input,
  ViewChild
} from '@angular/core';

import {
  StacheNavLink
} from '../../nav/nav-link';

import {
  StacheSidebarWrapperComponent
} from '../sidebar-wrapper.component';

@Component({
  selector: 'sidebar-test-cmp',
  templateUrl: './sidebar-test.component.fixture.html'
})
export class SidebarTestComponent {
  @Input()
  public routes: StacheNavLink[] = [
    {
      name: 'Home',
      path: '/home',
      children: [
        {
          name: 'Test',
          path: '/test',
          children: [
            {
              name: 'Test Child',
              path: '/test/child'
            },
            {
              name: 'Test Child2',
              path: '/test/child'
            }
          ]
        }
      ]
    }
  ];

  @ViewChild(StacheSidebarWrapperComponent)
  public sidebarComponent: StacheSidebarWrapperComponent;
}
