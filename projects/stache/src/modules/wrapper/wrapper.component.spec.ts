import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ActivatedRoute
} from '@angular/router';

import {
  RouterTestingModule
} from '@angular/router/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyAppConfig
} from '@skyux/config';

import {
  SkyMediaQueryModule
} from '@skyux/core';

import {
  Observable,
  of as observableOf,
  Subject
} from 'rxjs';

import {
  StacheWrapperTestComponent
} from './fixtures/wrapper.component.fixture';

import {
  StacheWrapperComponent
} from './wrapper.component';

import {
  StacheWrapperModule
} from './wrapper.module';

import {
  StacheFooterModule
} from '../footer/footer.module';

import {
  StacheTitleService
} from './title.service';

import {
  StacheNavLink
} from '../nav/nav-link';

import {
  StacheNavService
} from '../nav/nav.service';

import {
  StacheWindowRef
} from '../shared/window-ref';

import {
  StacheRouteService
} from '../router/route.service';

import {
  StacheOmnibarAdapterService
} from '../shared/omnibar-adapter.service';

import {
  StacheJsonDataService
} from '../json-data/json-data.service';

import {
  StacheLayoutModule
} from '../layout/layout.module';

import {
  StachePageAnchorModule
} from '../page-anchor/page-anchor.module';

import { StachePageAnchorService } from '../page-anchor/page-anchor.service';

describe('StacheWrapperComponent', () => {
  let component: StacheWrapperComponent;
  let fixture: ComponentFixture<StacheWrapperComponent>;
  let mockActivatedRoute: any;
  let mockConfigService: any;
  let mockNavService: any;
  let mockJsonDataService: any;
  let mockTitleService: any;
  let mockWindowService: any;
  let mockOmnibarService: any;
  let mockTextContent: string = '';

  class MockActivatedRoute {
    public fragment: Observable<string> = observableOf('test-route');
    public url: Observable<string[]> = observableOf(['test', 'routes']);
    // snapshot is a required prop on activatedRoute to avoid an error with `'_lastPathIndex' of undefined`
    // https://stackoverflow.com/questions/41245783/angular-testing-router-params-breaks-test-bed
    public snapshot = {};
    public setFragment(fragString: any) {
      this.fragment = observableOf(fragString);
    }
  }

  class MockNavService {
    public navigate(route: any) { }

    public isExternal() {
      return false;
    }
  }

  class MockOmbibarService {
    public checkForOmnibar() {}
    public getHeight() {}
  }

  class MockConfigService {
    public skyux: any = {
      appSettings: {
        stache: {
          editButton: {
            url: 'https://google.com'
          }
        }
      }
    };
    public runtime: any = {
      routes: [],
      app: {
        base: ''
      }
    };
    public stache: any = {
      footer: {
        nav: [
          {
            title: 'Some Title',
            text: 'Some text'
          }
        ]
      }
    };
  }

  class MockJsonDataService {
    public getAll = jasmine.createSpy('getAll').and.callFake(() => {
      return {};
    });
  }

  class MockTitleService {
    public setTitle = jasmine.createSpy('setTitle');
  }

  class MockAnchorService {
    public pageAnchorsStream = observableOf(
    [
      {
        path: 'First Path',
        name: 'First Heading',
        fragment: 'First Fragment',
        offsetTop: 1
      } as StacheNavLink,
      {
        path: 'Second Path',
        name: 'Second Heading',
        fragment: 'Second Fragment',
        offsetTop: 2
      } as StacheNavLink
    ]
    );
    public refreshRequestedStream = new Subject();
    public addAnchor = function() {};
  }

  class MockWindowService {
    public nativeWindow = {
      document: {
        body: document.createElement('div'),
        getElementById: jasmine.createSpy('getElementById').and.callFake(function(id: any) {
          if (id !== undefined) {
            return {
              scrollIntoView() { }
            };
          }
          return id;
        }),
        querySelector: jasmine.createSpy('querySelector').and.callFake(function(selector: string) {
          return {
            textContent: mockTextContent,
            classList: {
              add(cssClass: string) { }
            },
            scrollIntoView() { },
            offsetHeight: 50,
            getBoundingClientRect() {
              return {
                top: 100
              };
            }
          };
        }),
        querySelectorAll: jasmine.createSpy('querySelectorAll').and.callFake((selector: string): any[] => {
          if (selector === '.stache-container') {
            let mockDiv = document.createElement('div');
            return [mockDiv];
          }
            return [];
        }),
        documentElement: {
          querySelector: jasmine.createSpy('querySelector').and.callFake(function(selector: string) {
            return {
              textContent: mockTextContent,
              classList: {
                add(cssClass: string) { }
              },
              scrollIntoView() { },
              offsetHeight: 50,
              getBoundingClientRect() {
                return {
                  top: 100
                };
              }
            };
          })
        }
      },
      setTimeout: jasmine.createSpy('setTimeout').and.callFake(function(callback: any) {
        return callback();
      }),
      scroll: jasmine.createSpy('scroll').and.callFake(function (x: number, y: number) {
        return true;
      }),
      location: {
        href: ''
      }
    };

    public scrollEventStream = observableOf(true);

    get onResize() {
      return observableOf({});
    }

    constructor(eventManager: any) {
      eventManager = {
        addGlobalEventListener: () => {}
      };
    }
  }

  beforeEach(() => {
    mockActivatedRoute = new MockActivatedRoute();
    mockNavService = new MockNavService();
    mockConfigService = new MockConfigService();
    mockJsonDataService = new MockJsonDataService();
    mockTitleService = new MockTitleService();
    mockWindowService = new MockWindowService({});
    mockOmnibarService = new MockOmbibarService();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StachePageAnchorModule,
        StacheLayoutModule,
        StacheFooterModule,
        StacheWrapperModule,
        SkyMediaQueryModule
      ],
      declarations: [
        StacheWrapperTestComponent
      ],
      providers: [
        StacheRouteService,
        { provide: StachePageAnchorService, useClass: MockAnchorService },
        { provide: StacheNavService, useValue: mockNavService },
        { provide: StacheOmnibarAdapterService, useValue: mockOmnibarService },
        { provide: StacheJsonDataService, useValue: mockJsonDataService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: StacheTitleService, useValue: mockTitleService },
        { provide: StacheWindowRef, useValue: mockWindowService },
        { provide: SkyAppConfig, useValue: mockConfigService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StacheWrapperComponent);
    component = fixture.componentInstance;
  });

  it('should render the component', () => {
    expect(fixture).toExist();
  });

  it('should have a pageTitle input', () => {
    component.pageTitle = 'Test Title';
    fixture.detectChanges();
    expect(component.pageTitle).toBe('Test Title');
  });

  it('should have a windowTitle input', () => {
    component.windowTitle = 'Test Title';
    fixture.detectChanges();
    expect(component.windowTitle).toBe('Test Title');
  });

  it('should have a layout input', () => {
    component.layout = 'sidebar';
    fixture.detectChanges();
    expect(component.layout).toBe('sidebar');
  });

   it('should have a sidebarRoutes input', () => {
    component.sidebarRoutes = [{ name: 'test', path: '/test' }];
    fixture.detectChanges();
    expect(component.sidebarRoutes.length).toBe(1);
  });

  it('should have a breadcrumbsRoutes input', () => {
    component.breadcrumbsRoutes = [{ name: 'test', path: '/test' }];
    fixture.detectChanges();
    expect(component.breadcrumbsRoutes.length).toBe(1);
  });

  it('should have a showBreadcrumbs input', () => {
    component.showBreadcrumbs = false;
    fixture.detectChanges();
    expect(component.showBreadcrumbs).toBe(false);
  });

  it('should have a showEditButton input', () => {
    component.showEditButton = true;
    fixture.detectChanges();
    expect(component.showEditButton).toBe(true);
  });

  it('should have a showTableOfContents input', () => {
    component.showTableOfContents = true;
    fixture.detectChanges();
    expect(component.showTableOfContents).toBe(true);
  });

  it('should have a showBackToTop input', () => {
    component.showBackToTop = false;
    fixture.detectChanges();
    expect(component.showBackToTop).toBe(false);
  });

  it('should set the input, showBreadcrumbs, to true by default', () => {
    fixture.detectChanges();
    expect(component.showBreadcrumbs).toBe(true);
  });

  it('should set the showEditButton based on the config option if set', () => {
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        expect(component.showEditButton).toBe(true);
      });
  });

  it('should set the showEditButton to false by default', async(() => {
    mockConfigService.skyux.appSettings.stache.editButton = undefined;
    fixture = TestBed.createComponent(StacheWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        expect(component.showEditButton).toBe(false);
      });
  }));

  it('should set the input, layout, to "sidebar" by default', () => {
    fixture.detectChanges();
    expect(component.layout).toBe('sidebar');
  });

  it('should set the input, showTableOfContents, to false by default', () => {
    fixture.detectChanges();
    expect(component.showTableOfContents).toBe(false);
  });

  it('should set the input, showBackToTop, to true by default', () => {
    fixture.detectChanges();
    expect(component.showBackToTop).toBe(true);
  });

  it('should set the window title', () => {
    const title = 'Test Title';
    component.windowTitle = title;
    fixture.detectChanges();
    expect(mockTitleService.setTitle).toHaveBeenCalledWith(title);
  });

  it('should set the window title based on stache pageTitle', () => {
    const title = 'Page Title';
    component.pageTitle = title;
    fixture.detectChanges();
    expect(mockTitleService.setTitle).toHaveBeenCalledWith(title);
  });

  it('should set the window title based on stache navTitle', () => {
    const title = 'Nav Title';
    component.navTitle = title;
    fixture.detectChanges();
    expect(mockTitleService.setTitle).toHaveBeenCalledWith(title);
  });

  it('should set the window title based on the Tutorial Header title', () => {
    const title = 'Tutorial Header Title';
    mockTextContent = title;
    component.ngOnInit();
    fixture.detectChanges();
    expect(mockTitleService.setTitle).toHaveBeenCalledWith(title);
    mockTextContent = '';
  });

  it('should not set the window title when the Tutorial Header title is absent', () => {
    fixture.detectChanges();
    expect(mockTitleService.setTitle).toHaveBeenCalledWith(undefined);
  });

  it('should set the window title based on pageTitle with existing navTitle and Tutorial Header', () => {
    const pageTitle = 'PageTitle';
    component.pageTitle = pageTitle;
    component.navTitle = 'Nav Title';
    mockTextContent = 'Tutorial Header Title';
    component.ngOnInit();
    fixture.detectChanges();
    expect(mockTitleService.setTitle).toHaveBeenCalledWith(pageTitle);
    mockTextContent = '';
  });

  it('should set the window title based on navTitle with existing Tutorial Header', () => {
    const navTitle = 'Nav Title';
    component.navTitle = navTitle;
    mockTextContent = 'Tutorial Header Title';
    component.ngOnInit();
    fixture.detectChanges();
    expect(mockTitleService.setTitle).toHaveBeenCalledWith(navTitle);
    mockTextContent = '';
  });

  it('should set the jsonData property on init', () => {
    fixture.detectChanges();
    expect(component.jsonData).toEqual(jasmine.any(Object));
  });

  it('should detect the omnibar if it exists on init', () => {
    spyOn(mockOmnibarService, 'checkForOmnibar').and.callThrough();
    component.ngOnInit();
    expect(mockOmnibarService.checkForOmnibar).toHaveBeenCalled();
  });

  it('should update inPageRoutes from stachePageAnchors after content is rendered', () => {
    const testFixture = TestBed.createComponent(StacheWrapperTestComponent);
    const testComponent = testFixture.componentInstance;

    testFixture.detectChanges();

    const inPageRoutes = testComponent.testWrapper.inPageRoutes;

    expect(inPageRoutes[0].name).toEqual('First Heading');
    expect(inPageRoutes[1].name).toEqual('Second Heading');
  });

  it('should use inPageRoutes over stachePageAnchors', () => {
    const testFixture = TestBed.createComponent(StacheWrapperTestComponent);
    const testNavLink = {
      name: 'test-anchor',
      path: './',
      fragment: '#test-anchor'
    };
    const testComponent = testFixture.componentInstance;
    testComponent.inPageRoutes = [testNavLink];
    testFixture.detectChanges();

    const inPageRoutes = testComponent.testWrapper.inPageRoutes;
    expect(inPageRoutes[0].name).toEqual(testNavLink.name);
  });

  it('should not navigate to a fragment if none exist', () => {
    mockActivatedRoute.setFragment(undefined);
    let subscribeSpy = spyOn(mockActivatedRoute.fragment, 'subscribe').and.callThrough();
    let navSpy = spyOn(mockNavService, 'navigate').and.callThrough();
    const testFixture = TestBed.createComponent(StacheWrapperTestComponent);

    testFixture.detectChanges();
    expect(subscribeSpy).toHaveBeenCalled();
    expect(navSpy).not.toHaveBeenCalled();
  });

  it('should not use in page routes from anchor service if custom routes are passed in', () => {
    const routes = [{name: 'testRoute'} as StacheNavLink];
    component.inPageRoutes = routes;
    component.ngAfterViewInit();
    expect(component.inPageRoutes).toEqual(routes);
  });

  describe('footer', () => {
    it('should hide by default', () => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('stache-footer')).toBeNull();
    });

    it('should default to SkyAppConfig if it exists', () => {
      mockConfigService.skyux.appSettings.stache.footer = true;
      fixture = TestBed.createComponent(StacheWrapperComponent);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('stache-footer')).toBeTruthy();
    });

    // This will allow documentation writers to not worry about proper attribute binding.
    it('should allow setting `showFooter` to string "false"', () => {
      (component as any).showFooter = 'true';
      fixture.detectChanges();
      expect(component.showFooter).toEqual(true);
      expect(fixture.nativeElement.querySelector('stache-footer')).toBeTruthy();
    });
  });
});
