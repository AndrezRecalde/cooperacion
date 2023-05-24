<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProyectoRequest extends FormRequest
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
            'organizacion_id'   =>  'required',
            'nombre_proyecto'   =>  'required',
            'objetivo_general'  =>  'required',
            'canton_id'         =>  'required',
            'parroquia_id'      =>  'required',
            'recinto_id'        =>  'required',
            'grupo_atencion_id' =>  'required',
            'grupo_beneficiado' =>  'required',
            'total_beneficiados' =>  'required',
            'odsostenible_id'   =>  'required',
            'cooperacion_id'    =>  'required',
            'modalidad_id'      =>  'required',
            'monto'             =>  'required',
            'estado_id'         =>  'required',
            'periodo_id'        =>  '',
            'activo'            =>  ''
        ];
    }

    public function messages(): array
    {
        return [
            'organizacion_id.required'      => 'La organización es obligatorio',
            'nombre_proyecto.required'      => 'El nombre de proyecto es obligatorio',
            'objetivo_general.required'     => 'El objetivo es obligatorio',
            'canton_id.required'            => 'El canton es obligatorio',
            'parroquia_id.required'         => 'La parroquia es obligatorio',
            'recinto_id.required'           =>  'El recinto es obligatorio',
            'grupo_atencion_id.required'    =>  'El grupo de atencion prioritaria es obligatoria',
            'grupo_beneficiado.required'    => 'El grupo es obligatorio',
            'total_beneficiados.required'    => 'El total es obligatorio',
            'odsostenible_id.required'      => 'El objetivo ods es obligatorio',
            'cooperacion_id.required'       => 'El tipo de Cooperación es obligatorio',
            'modalidad_id.required'         => 'La modalidad es obligatoria',
            'monto.required'                => 'El monto es obligatorio',
            'estado_id.required'            =>  'El estado es obligatorio'
        ];
    }

    protected function failedValidation(Validator $validator): HttpResponseException
    {
        /* $errors = (new ValidationException($validator))->errors(); */
        throw new HttpResponseException(response()->json(['errores' => $validator->errors()], 422));
    }
}
