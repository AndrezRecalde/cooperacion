<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AfiliacionRequest extends FormRequest
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
            'nombres'       =>  'required',
            'entidad'       =>  'required',
            'cargo'         =>  'required',
            'telefono'      =>  'required',
            'email'         =>  'required',
            'razon_social'  =>  'required',
            'sitio_web'     =>  '',
            'telefono_org'  =>  'required',
            'direccion_org' =>  'required',
            'descripcion_org'   =>  'required',
            'archivos[]'          =>  'mimes:pdf'
        ];
    }

    public function messages(): array
    {
        return [
            'nombres.required'   =>  'El nombre del contacto es requerido',
            'entidad.required'   =>  'La entidad es requerida',
            'cargo.required'     =>  'El cargo ocupacional del contacto es requerido',
            'telefono.required'  =>  'El teléfono del contacto es requerido',
            'email.required'     =>  'El email del contacto es requerido',
            'razon_social.required'  =>  'La razón social de la entidad es requerido',
            'sitio_web.required' =>  'El sitio web de la entidad es requerido',
            'telefono_org.required'  =>  'El teléfono de la entidad es requerido',
            'direccion_org.required' =>  'La dirección de la entidad es requerida',
            'descripcion_org.required'   =>  'La descripción de la entidad es requerida'
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
