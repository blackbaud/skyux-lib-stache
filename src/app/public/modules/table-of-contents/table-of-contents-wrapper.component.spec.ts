import {
  ComponentFixture,
  TestBed,
  async
} from '@angular/core/testing';

import {
  Renderer2
} from '@angular/core';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  RouterTestingModule
} from '@angular/router/testing';

import {
  Observable
} from 'rxjs';

import {
  StacheTableOfContentsModule
} from './table-of-contents.module';

import {
  StacheTableOfContentsWrapperComponent
} from './table-of-contents-wrapper.component';

import {
  StacheNavModule
} from '../nav/nav.module';

import {
  StacheOmnibarAdapterService,
  StacheRouteService,
  StacheWindowRef
} from '../shared';

class MockWindowService {
  public nativeWindow = {
    document: {
      querySelector: () => {},
      body: {
        classList: {
          add: () => {},
          remove: () => {}
        }
      }
    },
    innerWidth: 100
  };
  public scrollEventStream = Observable.of(true);
}

class MockStacheRouteService {
  public getActiveUrl = () => '';
}

class MockRenderer {
  public classList: any[] = [];
  public addClass = (el: any, classname: any) => {};
  public removeClass = (el: any, classname: any) => {};
}

const route = {
  name: 'string',
  path: '/string',
  offsetTop: 123,
  isCurrent: false
};

class MockOmnibarService {
  public getHeight = () => 50;
}

describe('Table of Contents Wrapper Component', () => {
  let component: StacheTableOfContentsWrapperComponent;
  let fixture: ComponentFixture<StacheTableOfContentsWrapperComponent>;
  let mockWindowService: any;
  let mockStacheRouteService: any;
  let mockRenderer: any;
  let mockOmnibarAdapterService: any;

  beforeEach(() => {
    mockWindowService = new MockWindowService();
    mockStacheRouteService = new MockStacheRouteService();
    mockRenderer = new MockRenderer();
    mockOmnibarAdapterService = new MockOmnibarService();

    TestBed.configureTestingModule({
      imports: [
        StacheNavModule,
        SkyI18nModule,
        StacheTableOfContentsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: StacheRouteService, useValue: mockStacheRouteService },
        { provide: StacheWindowRef, useValue: mockWindowService },
        { provide: Renderer2, useValue: mockRenderer },
        { provide: StacheOmnibarAdapterService, useValue: mockOmnibarAdapterService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StacheTableOfContentsWrapperComponent);
    component = fixture.componentInstance;

    component.tocRoutes = [route];
  });

  it('should exist', () => {
    expect(fixture).toExist();
  });

  it('should pass accessibility', async(() => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeAccessible();
  }));
});