import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

import {
  RouterTestingModule
} from '@angular/router/testing';

import {
  SkyRestrictedViewAuthService
} from '@blackbaud/skyux-lib-restricted-view';

import {
  expect
} from '@skyux-sdk/testing';

import {
  BehaviorSubject
} from 'rxjs';

import {
  StacheRouteService
} from '../router/route.service';

import {
  StacheActionButtonsComponent
} from './action-buttons.component';

import {
  StacheActionButtonsModule
} from './action-buttons.module';

describe('StacheActionButtonsComponent', () => {
  let mockActiveUrl = '';
  let mockRoutes = [
    {
      path: '',
      children: [
        {
          path: 'parent',
          children: [
            {
              path: 'parent/child',
              children: [
                {
                  path: 'parent/child/grandchild'
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  class MockRouteService {
    public getActiveRoutes() {
      return mockRoutes;
    }
    public getActiveUrl() {
      return mockActiveUrl;
    }
  }

  class MockRestricedViewAuthService {
    public isAuthenticated = new BehaviorSubject<boolean>(false);
  }

  let component: StacheActionButtonsComponent;
  let fixture: ComponentFixture<StacheActionButtonsComponent>;
  let mockRouteService: MockRouteService;
  let mockRestricedViewAuthService: MockRestricedViewAuthService;

  beforeEach(() => {
    mockRestricedViewAuthService = new MockRestricedViewAuthService();

    TestBed.configureTestingModule({
      imports: [
        StacheActionButtonsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: StacheRouteService, useValue: mockRouteService },
        { provide: SkyRestrictedViewAuthService, useValue: mockRestricedViewAuthService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StacheActionButtonsComponent);
    component = fixture.componentInstance;
  });

  it('should render the component', () => {
    expect(fixture).toExist();
  });

  it('should display action buttons', () => {
    component.routes = [{
      name: 'Test',
      icon: 'fa-circle',
      summary: '',
      path: []
    }];

    fixture.detectChanges();
    const actionButtons = fixture.debugElement.queryAll(By.css('.sky-action-button'));

    expect(actionButtons.length).toBe(1);
  });

  it('should pass the value of the search input to searchApplied on key up', () => {
    component.routes = [{
      name: 'Test',
      icon: 'fa-circle',
      summary: '',
      path: []
    }];

    spyOn(component, 'searchApplied');
    component.onKeyUp({
      target: { value: 'Test' }
    } as any);
    fixture.detectChanges();

    expect(component.searchApplied).toHaveBeenCalledWith('Test');
  });

  it('should filter out the buttons that do not meet the search criteria', () => {
    component.routes = [
      {
        name: 'Test',
        path: '/'
      },
      {
        name: 'Different',
        path: '/'
      },
      {
        name: 'Still good',
        path: '/',
        summary: 'Test'
      }
    ];
    fixture.detectChanges();
    component.searchApplied('Test');
    fixture.detectChanges();

    expect(component.filteredRoutes.length).toBe(2);
  });

  it('should return proper search results but also remove restricted routes if not a BB user', () => {
    component.routes = [
      {
        name: 'Test',
        path: '/'
      },
      {
        name: 'Restricted route',
        path: '/',
        summary: 'Test',
        restricted: true
      },
      {
        name: 'Still good',
        path: '/',
        summary: 'Test'
      }
    ];
    fixture.detectChanges();
    component.searchApplied('Test');
    fixture.detectChanges();

    expect(component.filteredRoutes.length).toBe(2);
  });

  it('should return all routes if no search text is passed in', () => {
    component.routes = [
      {
        name: 'Test',
        path: '/'
      },
      {
        name: 'Different',
        path: '/'
      },
      {
        name: 'Still good',
        path: '/',
        summary: 'Test'
      }
    ];
    fixture.detectChanges();
    component.searchApplied('');
    fixture.detectChanges();

    expect(component.filteredRoutes.length).toBe(3);
  });

  it('should pass accessibility', async(() => {
    component.routes = [
      {
        name: 'Test',
        path: '/'
      },
      {
        name: 'Different',
        path: '/'
      },
      {
        name: 'Still good',
        path: '/',
        summary: 'Test'
      }
    ];

    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement).toBeAccessible();
  }));

  it('should allow async routes', () => {
    component.routes = undefined;
    fixture.detectChanges();

    expect(component.filteredRoutes.length).toBe(0);

    component.routes = [{
      name: 'Sample',
      path: '/'
    }];
    fixture.detectChanges();

    expect(component.filteredRoutes.length).toBe(1);
  });

  it('should allow hiding search', () => {
    component.showSearch = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('sky-search')).toBeNull();
  });

  // This will allow documentation writers to not worry about proper attribute binding.
  it('should allow hiding search with string "false"', () => {
    (component as any).showSearch = 'false';
    fixture.detectChanges();
    expect(component.showSearch).toEqual(false);
    expect(fixture.nativeElement.querySelector('sky-search')).toBeNull();
  });

  it('should filter out restricted routes if the user is not an authenticated BB user', () => {
    component.routes = [
      {
        name: 'Test 1',
        path: '/',
        restricted: true
      }
    ];
    fixture.detectChanges();

    const actionButtons = fixture.nativeElement.querySelectorAll('.sky-action-button');

    expect(actionButtons.length).toEqual(0);
  });

  it('should not filter out routes when the restricted property is false or undefined', () => {
    component.routes = [
      {
        name: 'Test 1',
        path: '/one',
        restricted: false
      },
      {
        name: 'Test 2',
        path: '/two'
      }
    ];
    fixture.detectChanges();

    const actionButtons = fixture.nativeElement.querySelectorAll('.sky-action-button');

    expect(actionButtons.length).toEqual(2);
  });

  it('should show restricted routes when user is an authenticated BB user', () => {
    mockRestricedViewAuthService.isAuthenticated = new BehaviorSubject<boolean>(true);

    component.routes = [
      {
        name: 'Test 1',
        path: '/one'
      },
      {
        name: 'Restricted route',
        path: '/two',
        restricted: true
      }
    ];
    fixture.detectChanges();

    const actionButtons = fixture.nativeElement.querySelectorAll('.sky-action-button');

    expect(actionButtons.length).toEqual(2);
  });
});
