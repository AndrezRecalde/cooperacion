<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class OdsostenibleRequest extends FormRequest
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
            'objetivo_ods'  =>  'required',
            'descripcion'   =>  'required',
            'logo_url'      =>  'required|mimes:png,jpg,jpeg',
            'banner_url'    =>  'required|mimes:png,jpg,jpeg'
        ];
    }

    public function messages(): array
    {
        return [
            'objetivo_ods.required'     =>  'El objetivo es obligatorio',
            'descripcion.required'      =>  'La descripcion es obligatoria',
            'logo_url.required'         =>  'El logo es obligatorio',
            'banner_url.required'       =>  'El banner es obligatorio',
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
