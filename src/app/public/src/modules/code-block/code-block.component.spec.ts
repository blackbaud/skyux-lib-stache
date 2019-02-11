import { ComponentFixture, TestBed, async} from '@angular/core/testing';
import {
  expect
} from '@blackbaud/skyux-lib-testing';
import { StacheCodeBlockTestComponent } from './fixtures/code-block.component.fixture';
import { StacheCodeBlockComponent } from './code-block.component';
import { SkyAppRuntimeModule } from '@skyux-sdk/builder/runtime';
import { HttpModule } from '@angular/http';
import { PipeTransform, Pipe } from '@angular/core';

import {
  SkyAppResourcesService
} from '@skyux/i18n';

import { SkyClipboardModule, SkyCopyToClipboardService } from '@blackbaud/skyux-lib-clipboard';
import { StacheWindowRef } from '../shared';

class MockClipboardService {
  public copyContent(content: string) { }
  public verifyCopyCommandBrowserSupport() {
    return true;
  }
}

@Pipe({
  name: 'skyAppResources'
})
export class MockSkyAppResourcesPipe implements PipeTransform {
  public transform(value: number): number {
    return value;
  }
}

class MockSkyAppResourcesService {
  public getString(): any {
    return {
      subscribe: (cb: any) => {
        cb();
      },
      take: () => {
        return {
          subscribe: (cb: any) => {
            cb();
          }
        };
      }
    };
  }
}

describe('StacheCodeBlockComponent', () => {
  let component: StacheCodeBlockComponent;
  let fixture: ComponentFixture<StacheCodeBlockComponent>;
  let element: HTMLElement;
  let mockSkyAppResourcesService: any;
  let mockClipboardService: any;

  beforeEach(() => {
    mockSkyAppResourcesService = new MockSkyAppResourcesService();
    mockClipboardService = new MockClipboardService();

    TestBed.configureTestingModule({
      declarations: [
        StacheCodeBlockTestComponent,
        StacheCodeBlockComponent,
        MockSkyAppResourcesPipe
      ],
      providers: [
        StacheWindowRef,
        { provide: SkyAppResourcesService, useValue: mockSkyAppResourcesService },
        { provide: SkyCopyToClipboardService, useValue: mockClipboardService }
      ],
      imports: [
        SkyAppRuntimeModule,
        SkyClipboardModule,
        HttpModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StacheCodeBlockComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should accept a string of code in the [code] attribute', () => {
    const code = '<p>asdf</p>';
    component.code = code;
    fixture.detectChanges();
    expect(element.querySelector('.stache-code-output')).toHaveText(code);
  });

  it('should not honor angular bindings in the [code] attribute', () => {
    const code = '<p>{{asdf}}</p>';
    component.code = code;
    fixture.detectChanges();
    expect(element.querySelector('.stache-code-output')).toHaveText(code);
  });

  it('should convert inner HTML to a string', () => {
    const code = '<p>Hello, {{name}}!</p>';
    const testFixture = TestBed.createComponent(StacheCodeBlockTestComponent);
    const testElement = testFixture.nativeElement;
    testFixture.detectChanges();
    expect(testElement.querySelector('.stache-code-output').textContent).toContain(code);
  });

  it('should not honor angular bindings in the inner HTML', () => {
    const code = '<p>Hello, {{name}}!</p>';
    const testFixture = TestBed.createComponent(StacheCodeBlockTestComponent);
    const testElement = testFixture.nativeElement;
    testFixture.detectChanges();
    expect(testElement.querySelector('.stache-code-output').textContent).toContain(code);
  });

  it('should handle invalid language types', () => {
    const code = '<p></p>';
    component.code = code;
    fixture.detectChanges();
    expect(element.querySelector('code.language-markup')).toExist();

    component.languageType = 'invalidType';
    fixture.detectChanges();
    expect(element.querySelector('code.language-markup')).toExist();

    component.languageType = 'javascript';
    fixture.detectChanges();
    expect(element.querySelector('code.language-javascript')).toExist();

    component.languageType = undefined;
    fixture.detectChanges();
    expect(element.querySelector('code.language-markup')).toExist();
  });

  it('should show copy to clipboard button', () => {
    const code = '<p></p>';
    component.code = code;
    fixture.detectChanges();
    expect(element.querySelector('sky-copy-to-clipboard')).toExist();
  });

  it('should hide copy to clipboard button', () => {
    const code = '<p></p>';
    component.code = code;
    component.hideCopyToClipboard = true;
    fixture.detectChanges();
    expect(element.querySelector('sky-copy-to-clipboard')).not.toExist();
  });

  it('should pass accessibility', async(() => {
    fixture.detectChanges();
    expect(element).toBeAccessible();
  }));
});
