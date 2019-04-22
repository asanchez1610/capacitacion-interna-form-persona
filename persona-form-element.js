import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar.js';

import './persona-form-styles.js';

/**
 * `persona-form-element`
 * Componente de registro de personas
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PersonaFormElement extends PolymerElement {
  static get template() {
    return html`
    <style include = "persona-form-styles" ></style>
      
    <!-- View -->      
    <vaadin-text-field label="Nombres" value = "{{persona.nombres}}"></vaadin-text-field>
    <vaadin-text-field label="Apellidos" value = "{{persona.apellidos}}"></vaadin-text-field>
   
    <vaadin-combo-box label="Tipo de documento" placeholder="Seleccione" items="[[documentsType]]" item-value-path="_id" item-label-path="codigo" value = "{{persona.tipoDocumento}}" ></vaadin-combo-box>
    <vaadin-text-field value = "{{persona.numDocumento}}" label="Número de documento"></vaadin-text-field>
    <vaadin-date-picker id = "fecNac" label = "Fecha de nacimiento"></vaadin-date-picker>
    <vaadin-text-field value = "{{persona.email}}" label="Email"></vaadin-text-field>
    <vaadin-text-field value = "{{persona.telefono}}" label="Telefono"></vaadin-text-field>
    <vaadin-progress-bar id = "loadingRegistro" hidden = "true" indeterminate value="0"></vaadin-progress-bar>
    <div style="width: 100%;text-align: center; margin-top: 10px;">
      <vaadin-button on-click = "_registro" id = "btnRegistro" theme="primary" >{{actionTitlePersona}}</vaadin-button>
       <vaadin-button on-tap = "_clearForm" id = "btnClear" theme="primary danger" >Reset</vaadin-button>
    </div>
    `;
  }
  static get properties() {
    return {
      actionTitlePersona: {
        type: String,
        value: 'Registrar'
      },
      persona: {
        type: Object,
        value: {}
      },
      documentsType: {
        type: Array,
        value: []
      }
    };
  }

  _clearForm() {
    this.persona = {};
    this.$.btnRegistro.disabled = false;
    this.$.btnClear.disabled = false;
    this.$.loadingRegistro.hidden = true;
  }

  _registro() {
    console.log('Persona:', this.persona);
    this.$.btnRegistro.disabled = true;
    this.$.btnClear.disabled = true;
    this.$.loadingRegistro.hidden = false;
    this.dispatchEvent(new CustomEvent(
      'persona-registro-event',
      {
        detail: this.persona,
        fnSuccess: this._clearForm
      }));
  }

}

window.customElements.define('persona-form-element', PersonaFormElement);
