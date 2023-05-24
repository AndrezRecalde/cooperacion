<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
            'nombres'           =>  'required',
            'apellidos'         =>  'required',
            'dni'               =>  ['required', Rule::unique('users')->ignore($this->request->get('id'))],
            'email'             =>  'required',
            'institucion_id'    =>  'required',
            'roles'             =>  'required'
        ];
    }

    public function messages(): array
    {
        return [
            'nombres.required'  => 'El/Los nombre(s) es obligatorio',
            'apellidos.required' => 'El/Los apellido(s) es obligatorio',
            'dni.required'      =>  'El número de cédula es obligatorio',
            'email.required'    =>  'El email es obligatorio',
            'institucion_id'    =>  'La institucion es obligatoria'

        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
