import {
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
  expect
} from '@skyux-sdk/testing';

import {
  StacheRouteMetadataService
} from '../router/route-metadata.service';

import {
  RouterLinkStubDirective
} from './fixtures/router-link-stub.directive.fixture';

import {
  StacheSidebarModule
} from './sidebar.module';

import {
  StacheSidebarComponent
} from './sidebar.component';

import {
  SidebarTestComponent
} from './fixtures/sidebar-test.component.fixture';

describe('SidebarTestComponent', () => {
  let component: StacheSidebarComponent;
  let fixture: ComponentFixture<StacheSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarTestComponent,
        RouterLinkStubDirective
      ],
      imports: [
        RouterTestingModule,
        StacheSidebarModule
      ],
      providers: [
        { provide: StacheRouteMetadataService, useValue: { routes: [] } }
      ]
    });

    fixture = TestBed.createComponent(StacheSidebarComponent);
    component = fixture.componentInstance;
  });

  it('should render the component', () => {
    expect(fixture).toExist();
  });

  it('should display navigation links', () => {
    component.routes = [
      {
        name: 'Header',
        path: '/',
        children: [
          { name: 'Test 1', path: [] },
          { name: 'Test 2', path: [] }
        ]
      }
    ];

    fixture.detectChanges();
    const links = fixture.debugElement.queryAll(By.css('.stache-nav-anchor'));

    expect(links.length).toBe(2);
  });

  it('should automatically generate routes from config', () => {
    const tmpFixture = TestBed.createComponent(SidebarTestComponent);
    tmpFixture.detectChanges();

    const links = tmpFixture.debugElement.queryAll(By.css('.stache-nav-anchor'));

    expect(links.length).toBe(3);
  });

  it('should add a \/ to a heading route when one is not present', () => {
    component.routes = [
      {
        name: 'Header',
        path: '',
        children: []
      }
    ];
    fixture.detectChanges();
    expect(component.heading).toEqual('Header');
    expect(component.headingRoute).toEqual('/');
  });

  it('should not add a \/ to a heading route when one is present', () => {
    component.routes = [
      {
        name: 'Header',
        path: '/',
        children: []
      }
    ];

    expect(component.heading).toEqual('Header');
    expect(component.headingRoute).toEqual('/');
  });

  it('should handle header paths if the path is an array', () => {
    component.routes = [
      {
        name: 'Foo',
        path: ['home', 'foo'],
        children: []
      }
    ];

    expect(component.heading).toEqual('Foo');
    expect(component.headingRoute).toEqual('/home/foo');
  });

  it('should use generated routes if no custom routes are provided', () => {
    const tmpFixture = TestBed.createComponent(SidebarTestComponent);
    tmpFixture.detectChanges();
    const heading: any = tmpFixture.nativeElement.querySelector('.stach-sidebar-heading-link');
    expect(heading.innerHTML.trim()).toEqual('Home');
  });

  it('should not use generated routes if custom routes are provided', () => {
    const tmpFixture = TestBed.createComponent(SidebarTestComponent);
    const cmp = tmpFixture.componentInstance as SidebarTestComponent;

    cmp.routes = [
      {
        name: 'Foo',
        path: ['home', 'foo'],
        children: []
      }
    ];

    tmpFixture.detectChanges();

    const sidebarHeading = tmpFixture.nativeElement.querySelector('.stach-sidebar-heading-link').innerHTML;

    expect(sidebarHeading.trim()).toEqual('Foo');
  });

  it('should get sidebar routes', () => {
    component.routes = [
      {
        name: 'Header',
        path: '/',
        children: [
          { name: 'Test 1', path: [] },
          { name: 'Test 2', path: [] }
        ]
      }
    ];

    expect(component.routes.length).toBe(1);
  });
});
