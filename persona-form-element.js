import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar.js';
import './persona-form-styles.js';
import '@lrnwebcomponents/responsive-grid/responsive-grid.js';

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
   
    <responsive-grid-row>
      <responsive-grid-col xl="6" lg="6" md="6" sm="12" xs="12">
       <vaadin-combo-box class = "custom-style" label="Tipo de documento" id = "tipoDocumento" placeholder="Seleccione" items="[[documentsType]]" item-value-path="_id" item-label-path="codigo" value = "{{persona.tipoDocumento._id}}" ></vaadin-combo-box>
      </responsive-grid-col>
      <responsive-grid-col xl="6" lg="6" md="6" sm="12" xs="12">
       <vaadin-text-field class = "custom-style" value = "{{persona.numDocumento}}" label="Número de documento"></vaadin-text-field>
      </responsive-grid-col>
    </responsive-grid-row>

  
   
    <vaadin-date-picker id = "fecnacimiento" value = "{{persona.fecNacimiento}}"  label = "Fecha de nacimiento"></vaadin-date-picker>
    <vaadin-text-field value = "{{persona.email}}" label="Email"></vaadin-text-field>
    <vaadin-text-field value = "{{persona.telefono}}" label="Telefono"></vaadin-text-field>
    <vaadin-progress-bar id = "loadingRegistro" hidden = "true" indeterminate value="0"></vaadin-progress-bar>
    <div style="width: 100%;text-align: center; margin-top: 10px;">
      <vaadin-button on-click = "_registro" id = "btnRegistro" theme="primary small" >{{actionTitlePersona}}</vaadin-button>
      <vaadin-button on-click = "_eliminar" theme="error primary small" hidden$ = {{isUpdate}}  >Eliminar</vaadin-button>
      <vaadin-button on-click = "_clearForm" id = "btnClear" theme="primary small" >Resget</vaadin-button>
    </div>
    `;
  }
  static get properties() {
    return {
      actionTitlePersona: {
        type: String,
        value: 'Nuevo'
      },
      isUpdate: {
        type: Boolean,
        value: true
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

  _clearForm(clearPersona) {
    if (clearPersona) {
      this.persona = {};
    }
    this.$.btnRegistro.disabled = false;
    this.$.btnClear.disabled = false;
    this.$.loadingRegistro.hidden = true;
  }

  _eliminar() {
    this.dispatchEvent(new CustomEvent(
      'persona-eliminar-event',
      {
        detail: {
          persona: this.persona,
          fnSuccess: ()=> { this._clearForm(true); }
        }
      }));
  }

  _registro() {
    this.$.btnRegistro.disabled = true;
    this.$.btnClear.disabled = true;
    this.$.loadingRegistro.hidden = false;
    this.persona.tipoDocumento = this.$.tipoDocumento.value;
    console.log('Persona:', this.persona);
    this.dispatchEvent(new CustomEvent(
      'persona-registro-event',
      {
        detail: {
          persona: this.persona,
          fnSuccess: ()=> { this._clearForm(true); }
        }
      }));
  }

}

window.customElements.define('persona-form-element', PersonaFormElement);
