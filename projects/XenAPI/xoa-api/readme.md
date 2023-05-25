npm install --global xo-cli
xo-cli --help
xo-cli --register --allowUnauthorized http://ant.local.kirbyware.com kirbymark
xo-cli --createToken http://ant.local.kirbyware.com kirbymark
curl -b authenticationToken=8hMnN9k5D-PUpgIO097c1EAsLlwNMxV5a6wcJsFTu3Q http://ant.local.kirbyware.com/rest/v0
curl -b authenticationToken=8hMnN9k5D-PUpgIO097c1EAsLlwNMxV5a6wcJsFTu3Q http://ant.local.kirbyware.com/rest/v0/vms\?fields\=name_label,power_state\&ndjson
curl -b authenticationToken=8hMnN9k5D-PUpgIO097c1EAsLlwNMxV5a6wcJsFTu3Q  'http://ant.local.kirbyware.com/rest/v0/vms?fields=name_label,power_state&ndjson'


{"name_label":"lkw-node00","power_state":"Running","href":"/rest/v0/vms/681aee9c-968b-3165-6e00-b3af73858a37"}


# Node01 
curl -b authenticationToken=8hMnN9k5D-PUpgIO097c1EAsLlwNMxV5a6wcJsFTu3Q 'http://ant.local.kirbyware.com/rest/v0/vms/681aee9c-968b-3165-6e00-b3af73858a37/actions/start'



# Node08
curl -b authenticationToken=8hMnN9k5D-PUpgIO097c1EAsLlwNMxV5a6wcJsFTu3Q  'http://ant.local.kirbyware.com/rest/v0/vms/9808d6be-fbe0-ccf7-e831-ad13cb7abd9a/actions/'

curl -X POST -b authenticationToken=8hMnN9k5D-PUpgIO097c1EAsLlwNMxV5a6wcJsFTu3Q  'http://ant.local.kirbyware.com/rest/v0/vms/9808d6be-fbe0-ccf7-e831-ad13cb7abd9a/actions/start'
curl -X POST -b authenticationToken=8hMnN9k5D-PUpgIO097c1EAsLlwNMxV5a6wcJsFTu3Q  'http://ant.local.kirbyware.com/rest/v0/vms/9808d6be-fbe0-ccf7-e831-ad13cb7abd9a/actions/start?sync'

curl -X POST -b authenticationToken=8hMnN9k5D-PUpgIO097c1EAsLlwNMxV5a6wcJsFTu3Q  'http://ant.local.kirbyware.com/rest/v0/vms/9808d6be-fbe0-ccf7-e831-ad13cb7abd9a/actions/clean_shutdown'