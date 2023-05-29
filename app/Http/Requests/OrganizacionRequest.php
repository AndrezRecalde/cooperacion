<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class OrganizacionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'nombre_organizacion'   =>  'required',
            'abreviatura'           =>  'required',
            'email'                 =>  'required',
            'razon_social'          =>  'required',
            'sitio_web'             =>  '',
            'telefono'              =>  'required',
            'descripcion'           =>  'required',
            'tipo_id'               =>  'required',
            'country_id'            =>  'required',
            'state_id'              =>  'required',
            'imagen_url'            =>  'required'
        ];
    }

    public function messages(): array
    {
        return [
            'nombre_organizacion.required'  => 'El nombre de organización es obligatoria',
            'abreviatura.required'          => 'La abreviatura es obligatoria',
            'tipo_required'                 => 'El tipo de organizacion es requerido',
            'email.required'                => 'El email de organización es obligatoria',
            'razon_social.required'         =>  'La razón social es obligatoria',
            'telefono.required'             =>  'El teléfono es obligatorio',
            'descripcion.required'          =>  'Por favor escriba una breve descripción de la organización',
            'country_id.required'           => 'El país de organización es obligatoria',
            'state_id.required'             => 'El estado de organización es obligatoria',
            'imagen_url.required'           =>  'El logo es obligatorio'
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
