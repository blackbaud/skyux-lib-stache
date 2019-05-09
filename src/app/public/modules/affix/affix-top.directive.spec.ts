import {
  ComponentFixture,
  fakeAsync,
  inject,
  tick,
  TestBed
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyAppTestUtility
} from '@skyux-sdk/testing/test-utility/test-utility';

import {
  StacheAffixTopDirective
} from './affix-top.directive';

import {
  AffixTopTestComponent
} from './fixtures/affix-top.component.fixture';

import {
  StacheCodeModule
} from '../code/code.module';

import {
  StacheAffixModule
} from './affix.module';

import {
  StacheOmnibarAdapterService
} from '../shared/omnibar-adapter.service';

describe('AffixTopTestDirective', () => {
  const className: string = StacheAffixTopDirective.AFFIX_CLASS_NAME;

  let omnibarAdapterService: StacheOmnibarAdapterService;
  let fixture: ComponentFixture<AffixTopTestComponent>;
  let directiveElements: any[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StacheCodeModule,
        StacheAffixModule
      ],
      declarations: [
        AffixTopTestComponent
      ]
    });

    fixture = TestBed.createComponent(AffixTopTestComponent);
    directiveElements = fixture.debugElement.queryAll(By.directive(StacheAffixTopDirective));
  });

  beforeEach(inject(
    [
      StacheOmnibarAdapterService
    ],
    (
      _omnibarAdapterService: StacheOmnibarAdapterService
    ) => {
      omnibarAdapterService = _omnibarAdapterService;
    })
  );

  it('should exist on the component', () => {
    expect(directiveElements[0]).not.toBeNull();
  });

  it('should call the on window scroll method when the window scrolls', fakeAsync(() => {
      const directiveInstance = directiveElements[0].injector.get(StacheAffixTopDirective);

      fixture.detectChanges();
      tick();

      spyOn(directiveInstance, 'onWindowScroll').and.callThrough();
      SkyAppTestUtility.fireDomEvent(window, 'scroll');

      expect(directiveInstance.onWindowScroll).toHaveBeenCalled();
    })
  );

  it('should add or remove stache-affix-top class based on offset to window ratio', fakeAsync(() => {
    const element = directiveElements[0].nativeElement;
    element.style.marginTop = '50px';

    window.scrollTo(0, 500);
    fixture.detectChanges();
    tick();

    SkyAppTestUtility.fireDomEvent(window, 'scroll');
    expect(element).toHaveCssClass(className);

    window.scrollTo(0, 0);
    SkyAppTestUtility.fireDomEvent(window, 'scroll');
    expect(element).not.toHaveCssClass(className);
  }));

  it('should take the omnibar height into consideration in the offset to window ratio',
    fakeAsync(() => {
      const element = directiveElements[0].nativeElement;
      element.style.marginTop = '50px';

      window.scrollTo(0, 25);
      fixture.detectChanges();
      tick();

      SkyAppTestUtility.fireDomEvent(window, 'scroll');
      expect(element).not.toHaveCssClass(className);

      spyOn(omnibarAdapterService, 'getHeight').and.returnValue(50);
      SkyAppTestUtility.fireDomEvent(window, 'scroll');
      expect(element).toHaveCssClass(className);
    })
  );

  it('should add or remove stache-affix-top class to a component\'s first child',
    fakeAsync(() => {
      const element = directiveElements[1].nativeElement.children[0];

      window.scrollTo(0, 500);
      fixture.detectChanges();
      tick();

      SkyAppTestUtility.fireDomEvent(window, 'scroll');
      expect(element).toHaveCssClass(className);

      window.scrollTo(0, 0);
      SkyAppTestUtility.fireDomEvent(window, 'scroll');
      expect(element).not.toHaveCssClass(className);
    })
  );

  it('should not attempt to reset the element if it already has',
    fakeAsync(() => {
      const element = directiveElements[0].nativeElement;
      element.style.marginTop = '500px';
      window.scrollTo(0, 0);
      fixture.detectChanges();
      tick();

      SkyAppTestUtility.fireDomEvent(window, 'scroll');
      expect(element).not.toHaveCssClass(className);

      SkyAppTestUtility.fireDomEvent(window, 'scroll');
      expect(element).not.toHaveCssClass(className);
    })
  );

  it('should set the maxHeight of the element based on footer offset - window pageYOffset - omnibar height',
    fakeAsync(() => {
      const element = directiveElements[0].nativeElement;
      const directiveInstance = directiveElements[0].injector.get(StacheAffixTopDirective);
      fixture.detectChanges();
      tick();
      directiveInstance.footerWrapper = {
        offsetParent: undefined,
        offsetTop: 450,
        getBoundingClientRect() {
          return {
            top: 0
          };
        }
      } as HTMLElement;

      window.resizeTo(1200, 800);
      window.scrollBy(0, 350);

      spyOn(omnibarAdapterService, 'getHeight').and.returnValue(50);
      SkyAppTestUtility.fireDomEvent(window, 'scroll');

      expect(element.style.height).toEqual('50px');
    })
  );
});
