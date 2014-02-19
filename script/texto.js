function cambiar(var)
{
	vista=document.getElementById(var).style.display;
	if (vista=='none')
		vista='block';
	else
		vista='none';

	document.getElementById(var).style.display = vista;
}