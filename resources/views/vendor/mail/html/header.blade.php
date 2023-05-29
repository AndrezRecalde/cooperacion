@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'OECI')
<img src="https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/revslider/home-2/Banner-Logo-975x397px.png" class="logo" alt="GADPE Logo">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
