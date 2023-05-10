export APIKEY=$(sops -d api-keys.enc.yaml | yq e '.APIKEY' -)

curl -X POST -H "Authorization: Bearer ${APIKEY}" -H "Content-Type: application/graphql" https://api.yelp.com/v3/graphql --data '
{
    business(id: "garaje-san-francisco") {
        name
        id
        alias
        rating
        url
    }
}'