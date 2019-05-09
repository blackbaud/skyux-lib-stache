import {
  ComponentFixture,
  TestBed,
  async
} from '@angular/core/testing';

import {
  RouterTestingModule
} from '@angular/router/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  StacheSidebarModule
} from './sidebar.module';

import {
  SidebarTestComponent
} from './fixtures/sidebar-test.component.fixture';

describe('StacheSidebarWrapperComponent', () => {
  const CONTAINER_SIDEBAR_CLASSNAME = 'stache-sidebar-enabled';

  let component: SidebarTestComponent;
  let fixture: ComponentFixture<SidebarTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarTestComponent
      ],
      imports: [
        RouterTestingModule,
        StacheSidebarModule
      ]
    });

    fixture = TestBed.createComponent(SidebarTestComponent);
    component = fixture.componentInstance;
  });

  it('should render the component', () => {
    fixture.detectChanges();
    expect(fixture).toExist();
  });

  it('should open and close the sidebar', () => {
    const sidebar = component.sidebarComponent;

    sidebar.sidebarOpen = false;
    fixture.detectChanges();

    expect(sidebar.sidebarOpen).toEqual(false);

    sidebar.toggleSidebar();
    fixture.detectChanges();

    expect(sidebar.sidebarOpen).toEqual(true);

    sidebar.toggleSidebar();
    fixture.detectChanges();

    expect(sidebar.sidebarOpen).toEqual(false);
  });

  it('should be accessible', async(() => {
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement).toBeAccessible();
  }));

  it(`should add the class ${ CONTAINER_SIDEBAR_CLASSNAME } to the body if one exists`, async(() => {
    fixture.detectChanges();
    expect(document.body.className).toContain(CONTAINER_SIDEBAR_CLASSNAME);
  }));

  it(`should remove the class ${ CONTAINER_SIDEBAR_CLASSNAME } from the body on destroy`, () => {
    fixture.detectChanges();
    expect(document.body.className).toContain(CONTAINER_SIDEBAR_CLASSNAME);
    component.sidebarComponent.ngOnDestroy();
    expect(document.body.className).not.toContain(CONTAINER_SIDEBAR_CLASSNAME);
  });
});
