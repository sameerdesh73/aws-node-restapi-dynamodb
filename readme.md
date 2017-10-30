REST API with NodeJS, Express and DynanoDB 

What you will need to install
Python/PIP
AWS CLI - http://docs.aws.amazon.com/cli/latest/userguide/installing.html
DynamoDB - http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html


To setup aws in path variable on osx
ls -d ~/Library/Python/*/bin/aws
export PATH=$HOME/Library/Python/3.6/bin:$PATH >> ~/.profile
If this does not work, edit file ~/.profile to add below export path

To query local instance, you will need to install AWS CLI and you can point to local instance with parameter --endpoint-url
aws dynamodb list-tables --endpoint-url http://localhost:8000

aws dynamodb get-item --table-name todo --endpoint-url http://localhost:8000
aws dynamodb batch-get-item --table-name todo --endpoint-url http://localhost:8000

To Check into git
======================

git add .
git commit -m 'comments....'
git push origin master



To setup solution
=========================

npm install

To run local DynamoDB instance, first go to folder where dynamodb is installed
java -Djava.library.path=~/Desktop/code/installs/dynamodb/DynamoDBLocal_lib -jar ~/Desktop/code/installs/dynamodb/DynamoDBLocal.jar -sharedDb

To delete existing table
aws dynamodb delete-table --table-name todo --endpoint-url http://localhost:8000

To create new table
node ./scripts/createtodotable.js -- confirm that dynamodb is running