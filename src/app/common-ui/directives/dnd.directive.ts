import { Directive, EventEmitter, HostBinding, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[dnd]',
    standalone: true
})

export class DndDirective{
    // передаем событие 
    @Output() fileDropped = new EventEmitter<File>();

    /* декоратор HostBinding для css*/
    @HostBinding('class.fileover')
    fileover = false;

    /* декоратор HostListener - альтернатива addEventListener */

    // Dragover - это событие происходит, когда пользователь перетаскивает элемент над целевой областью
    @HostListener('dragover', ['$event'])
    onDragOver(event: DragEvent){
        event.preventDefault();
        event.stopPropagation();

        this.fileover = true
    }

    // Dragleave - оно происходит, когда элемент перетаскивания покидает область, которая является целевой
    @HostListener('dragleave', ['$event'])
    onDragLeave(event: DragEvent){
        event.preventDefault();
        event.stopPropagation();

        this.fileover = false
    }

    // Drop - оно вызывается, когда элемент был перетаскиваем и отпущен
    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent){
        event.preventDefault();
        event.stopPropagation();

        this.fileover = false;

        // событие (картинка)
        this.fileDropped.emit(event.dataTransfer?.files[0]); 
    }

}