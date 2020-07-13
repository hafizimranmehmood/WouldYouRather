export function formatDate (timestamp) {
	var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
  	const d = new Date(timestamp)
  	const time = d.toLocaleTimeString('en-US')
  	return d.toLocaleDateString('en-US', options) + ' | ' + time.substr(0, 4) + ' '+ time.slice(-2)
}