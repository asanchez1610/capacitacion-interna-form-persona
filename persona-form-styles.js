import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="persona-form-styles">
  <template>
    <style>
    :host {
        display: block;
      }

      vaadin-combo-box , vaadin-text-field , vaadin-date-picker{
        width: 100%;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
