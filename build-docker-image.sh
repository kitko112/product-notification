rm -rf dist
yarn build

IMAGE=x200-ubuntu:5000/rexi-product:$(date +'%Y%m%d%H%M')
docker build --rm -t $IMAGE -f Dockerfile .
docker push $IMAGE