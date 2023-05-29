<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class OrganizacionUpdateRequest extends FormRequest
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
            'email'                 =>  ['required', Rule::unique('organizaciones')->ignore($this->request->get('id'))],
            'razon_social'          =>  ['required', Rule::unique('organizaciones')->ignore($this->request->get('id'))],
            'sitio_web'             =>  '',
            'telefono'              =>  'required',
            'descripcion'           =>  'required',
            'tipo_id'               =>  'required',
            'country_id'            =>  'required',
            'state_id'              =>  'required',
            'imagen_url'            =>  'required'
        ];
    }
    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
