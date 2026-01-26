import { Component, ElementRef, HostListener, Input, inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-file-upload',
    imports: [],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FileUploadComponent,
            multi: true
        }
    ]
})
export class FileUploadComponent {
  #host = inject(ElementRef<HTMLInputElement>);
  onChange!: Function;
  file: File | null = null;
  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  writeValue( value: null ) {
    // clear file input
    this.#host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }
}
