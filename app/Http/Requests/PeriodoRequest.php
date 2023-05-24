<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class PeriodoRequest extends FormRequest
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
            'maxima_autoridad'  =>  'required',
            'fecha_inicial'     =>  'required',
            'fecha_final'       =>  'required',
            'activo'            =>  'required'
        ];
    }

    public function messages(): array
    {
        return [
            'maxima_autoridad.required' =>  'Por favor coloque el nombre de la Máxima Autoridad',
            'fecha_inicial.required'    =>  'La fecha inicial es requerida',
            'fecha_final.required'      =>  'La fecha final es requerida',
            'activo.required'           =>  'El estado es requerido'
        ];
    }
    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
