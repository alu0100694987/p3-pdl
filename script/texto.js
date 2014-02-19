function cambiar(v)
{
	vista=document.getElementById(v).style.display;
	if (vista=='none')
		vista='block';
	else
		vista='none';

	document.getElementById(v).style.display = vista;
}