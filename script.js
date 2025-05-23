function addRuleGroup(afterElement = null, insertAtTop = false) {
    const div = document.createElement('div');
    div.className = 'ruleGroup';
    div.innerHTML = `
        <div class="section-title">Rule Group</div>
        <label>Start Date:</label>
        <input type="date" class="startDate" required />
        <label>End Date (optional):</label>
        <input type="date" class="endDate" />
        <label>Enabled:</label>
        <select class="enabled">
            <option value="true" selected>true</option>
            <option value="false">false</option>
        </select>
        <div class="rules"></div>
        <button onclick="addRule(this)" class="add-rule-btn">Add Billing Rule</button>
        <button onclick="addRuleGroup(this.parentElement)" class="add-rule-group-btn">Add Rule Group</button>
        <button class="remove-rule-group-btn" onclick="this.parentElement.remove()">Remove Rule Group</button>
    `;

    const container = document.getElementById('groupsContainer');
    if (insertAtTop) {
        container.insertBefore(div, container.firstChild);
    } else if (afterElement) {
        container.insertBefore(div, afterElement.nextSibling);
    } else {
        container.appendChild(div);
    }
}

function addRule(button) {
    const rulesContainer = button.previousElementSibling;
    const div = document.createElement('div');
    div.className = 'rule';
    div.innerHTML = `
        <label>Billing Rule Name:</label>
        <input type="text" class="ruleName" placeholder="Enter Billing Rule name" />
        <br>
        <label>Billing Adjustment:</label>
        <input type="number" class="billingAdjustment" placeholder="e.g. 0.00"/>
        <label>Billing Rule Type:</label>
        <select class="billingRuleType">
            <option value="percentDiscount">percentDiscount</option>
            <option value="percentIncrease">percentIncrease</option>
            <option value="fixedRate">fixedRate</option>
        </select>
        <label class="includeDataTransfer">Include Data Transfer:</label>
        <select class="includeDataTransfer">
            <option value="true">true</option>
            <option value="false">false</option>
        </select>
        <label class="includeRIPurchases">Include RI Purchases:</label>
        <select class="includeRIPurchases">
            <option value="true">true</option>
            <option value="false" selected>false</option>
        </select>
        <br>
        <label>Product Name:</label>
        <input type="text" class="productName" list="productList" placeholder="Leave empty for Any Products" />
        <datalist id="productList">
            <option value="Amazon API Gateway" />
            <option value="Amazon AppFlow" />
            <option value="Amazon AppStream" />
            <option value="Amazon Athena" />
            <option value="Amazon Bedrock" />
            <option value="Amazon Chime" />
            <option value="Amazon CloudFront" />
            <option value="Amazon CloudSearch" />
            <option value="Amazon CodeWhisperer" />
            <option value="Amazon Cognito" />
            <option value="Amazon Comprehend" />
            <option value="Amazon Connect" />
            <option value="Amazon DataZone" />
            <option value="Amazon Detective" />
            <option value="Amazon DevOps Guru" />
            <option value="Amazon DocumentDB (with MongoDB compatibility)" />
            <option value="Amazon DynamoDB" />
            <option value="Amazon EC2" />
            <option value="Amazon EC2 Container Registry (ECR)" />
            <option value="Amazon Elastic Compute Cloud" />
            <option value="Amazon Elastic Container Registry Public" />
            <option value="Amazon Elastic Container Service" />
            <option value="Amazon Elastic Container Service for Kubernetes" />
            <option value="Amazon Elastic File System" />
            <option value="Amazon Elastic MapReduce" />
            <option value="Amazon Elastic Transcoder" />
            <option value="Amazon ElastiCache" />
            <option value="Amazon FSx" />
            <option value="Amazon Glacier" />
            <option value="Amazon GuardDuty" />
            <option value="Amazon HealthLake" />
            <option value="Amazon Inspector" />
            <option value="Amazon Interactive Video Service" />
            <option value="Amazon Kendra" />
            <option value="Amazon Keyspaces (for Apache Cassandra)" />
            <option value="Amazon Kinesis" />
            <option value="Amazon Kinesis Analytics" />
            <option value="Amazon Kinesis Firehose" />
            <option value="Amazon Lambda" />
            <option value="Amazon Lex" />
            <option value="Amazon Lightsail" />
            <option value="Amazon Location Service" />
            <option value="Amazon Machine Learning" />
            <option value="Amazon Macie" />
            <option value="Amazon Managed Blockchain" />
            <option value="Amazon Managed Grafana" />
            <option value="Amazon Managed Service for Prometheus" />
            <option value="Amazon Managed Streaming for Apache Kafka" />
            <option value="Amazon Managed Workflows for Apache Airflow" />
            <option value="Amazon Mechanical Turk" />
            <option value="Amazon Mechanical Turk Worker Rewards" />
            <option value="Amazon MemoryDB" />
            <option value="Amazon MQ" />
            <option value="Amazon Neptune" />
            <option value="Amazon Omics" />
            <option value="Amazon OpenSearch Service" />
            <option value="Amazon Personalize" />
            <option value="Amazon Polly" />
            <option value="Amazon Q" />
            <option value="Amazon Quantum Ledger Database" />
            <option value="Amazon QuickSight" />
            <option value="Amazon RDS" />
            <option value="Amazon Redshift" />
            <option value="Amazon Registrar" />
            <option value="Amazon Rekognition" />
            <option value="Amazon Relational Database Service" />
            <option value="Amazon Route 53" />
            <option value="Amazon S3" />
            <option value="Amazon S3 Glacier Deep Archive" />
            <option value="Amazon SageMaker" />
            <option value="Amazon Security Lake" />
            <option value="Amazon Simple Email Service" />
            <option value="Amazon Simple Notification Service" />
            <option value="Amazon Simple Queue Service" />
            <option value="Amazon Simple Storage Service" />
            <option value="Amazon Simple Workflow Service" />
            <option value="Amazon SimpleDB" />
            <option value="Amazon Textract" />
            <option value="Amazon Timestream" />
            <option value="Amazon Transcribe" />
            <option value="Amazon Translate" />
            <option value="Amazon Verified Permissions" />
            <option value="Amazon Virtual Private Cloud" />
            <option value="Amazon VPC" />
            <option value="Amazon WorkDocs" />
            <option value="Amazon WorkSpaces" />
            <option value="Amazon WorkSpaces Web" />
            <option value="AmazonCloudWatch" />
            <option value="AmazonWorkMail" />
            <option value="AWS Amplify" />
            <option value="AWS App Runner" />
            <option value="AWS AppSync" />
            <option value="AWS Application Migration Service" />
            <option value="AWS Audit Manager" />
            <option value="AWS Backup" />
            <option value="AWS Billing Conductor" />
            <option value="AWS Budgets" />
            <option value="AWS Certificate Manager" />
            <option value="AWS Cloud Map" />
            <option value="AWS Cloud WAN" />
            <option value="AWS CloudFormation" />
            <option value="AWS CloudHSM" />
            <option value="AWS CloudShell" />
            <option value="AWS CloudTrail" />
            <option value="AWS CodeArtifact" />
            <option value="AWS CodeBuild" />
            <option value="AWS CodeCommit" />
            <option value="AWS CodePipeline" />
            <option value="AWS Compute Optimizer" />
            <option value="AWS Config" />
            <option value="AWS Cost Explorer" />
            <option value="AWS Data Pipeline" />
            <option value="AWS Data Transfer" />
            <option value="AWS Database Migration Service" />
            <option value="AWS DataSync" />
            <option value="AWS DeepRacer" />
            <option value="AWS Device Farm" />
            <option value="AWS Direct Connect" />
            <option value="AWS Directory Service" />
            <option value="AWS Elemental MediaConnect" />
            <option value="AWS Elemental MediaConvert" />
            <option value="AWS Elemental MediaLive" />
            <option value="AWS Elemental MediaStore" />
            <option value="AWS End User Messaging" />
            <option value="AWS Firewall Manager" />
            <option value="AWS Global Accelerator" />
            <option value="AWS Glue" />
            <option value="AWS HealthImaging" />
            <option value="AWS Identity and Access Management Access Analyzer" />
            <option value="AWS IoT" />
            <option value="AWS IoT Device Defender" />
            <option value="AWS IoT Device Management" />
            <option value="AWS IoT Events" />
            <option value="AWS IoT TwinMaker" />
            <option value="AWS Key Management Service" />
            <option value="AWS Lambda" />
            <option value="AWS Migration Hub Refactor Spaces" />
            <option value="AWS Network Firewall" />
            <option value="AWS Payment Cryptography" />
            <option value="AWS Route 53 Application Recovery Controller" />
            <option value="AWS Secrets Manager" />
            <option value="AWS Security Hub" />
            <option value="AWS Service Catalog" />
            <option value="AWS Shield" />
            <option value="AWS Skill Builder Individual" />
            <option value="AWS Step Functions" />
            <option value="AWS Storage Gateway" />
            <option value="AWS Support (Business)" />
            <option value="AWS Support (Developer)" />
            <option value="AWS Support (Enterprise)" />
            <option value="AWS Premium Support" />
            <option value="AWS Systems Manager" />
            <option value="AWS Telco Network Builder" />
            <option value="AWS Transfer Family" />
            <option value="AWS WAF" />
            <option value="AWS X-Ray" />
            <option value="CloudWatch Events" />
            <option value="CodeBuild" />
            <option value="Contact Lens for Amazon Connect" />
            <option value="DynamoDB Accelerator (DAX)" />
            <option value="Elastic Load Balancing" />
            <option value="Savings Plans for AWS Compute usage" />
            <option value="Savings Plans for AWS Machine Learning" />
        </datalist>
        <Label class="includeDataTransfer">Product Include Data Transfer:</label>
        <select class="productIncludeDataTransfer">
            <option value="">(inherit)</option>
            <option value="true">true</option>
            <option value="false">false</option>
        </select>
        <label class="includeRIPurchases">Product Include RI Purchases:</label>
        <select class="productIncludeRIPurchases">
            <option value="">(inherit)</option>
            <option value="true">true</option>
            <option value="false">false</option>
        </select>
        <br>
        <label>Region (optional):</label>
        <input type="text" class="region" />
        <div class="sub-group">
            <label>Usage Types:</label>
            <div class="usageTypes"></div>
            <div class="sub-entry">
                <button class="addUsageType" type="button" onclick="addUsageType(this)">+</button>
            </div>
        </div>
        <div class="sub-group">
            <label>Operations:</label>
            <div class="operations"></div>
            <div class="sub-entry">
                <button class="addOperation" type="button" onclick="addOperation(this)">+</button>
            </div>
        </div>
        <div class="sub-group">
            <label>Record Types:</label>
            <div class="recordTypes"></div>
            <div class="sub-entry">
                <button class="addRecordType" type="button" onclick="addRecordType(this)">+</button>
            </div>
        </div>
        <div class="sub-group">
            <label>Instance Properties:</label>
            <div class="instanceProperties"></div>
            <div class="sub-entry">
                <button class="addInstanceProperty" type="button" onclick="addInstanceProperty(this)">+</button>
            </div>
        </div>
        <div class="sub-group">
            <label>Line Item Descriptions:</label>
            <div class="lineItemDescriptions"></div>
            <div class="sub-entry">
                <button class="addLineItem" type="button" onclick="addLineItemDescription(this)">+</button>
            </div>
        </div>
        <div class="sub-group">
            <label>Savings Plan Offering Types:</label>
            <div class="savingsPlanOfferingTypes"></div>
            <div class="sub-entry">
                <button class="addSavingsPlanOfferingType" type="button" onclick="addSavingsPlanOfferingType(this)">+</button>
            </div>
        </div>
        <button class="remove-rule-btn" onclick="this.parentElement.remove()">Remove Billing Rule</button>
    `;
    rulesContainer.appendChild(div);
}

// Copy to Clipboard Function
function copyToClipboard(textareaId) {
    const textarea = document.getElementById(textareaId);
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

// Download Output
function downloadText(textareaId, extension) {
    const text = document.getElementById(textareaId).value;
    const nameInput = document.getElementById('bookName');
    let base = nameInput ? nameInput.value.trim() : 'output';
    if (!base) base = 'output';

    base = base.replace(/[^\w\-]/g, '_');

    const now = new Date();
    const timestamp = now.toISOString().split('T')[0];
    const filename = `${base}_${timestamp}.${extension}`;

    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Info Button
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('infoButton').addEventListener('click', function () {
        var infoModal = document.getElementById('infoModal');
        infoModal.style.display = 'block';
        document.getElementById('infoContent').innerHTML = `
        <p><strong>Rule Order:</strong> Custom price book XML specifications process rules in top-down order. The first applicable rule that satisfies all specified constraints for a line item is used, and then no subsequent rules are used for that line item. If no applicable and matching rule is found, the line item will have a 0% calculated price adjustment.</p>
        <p><strong>Rule Applicability:</strong> Rule applicability is determined by the startDate and endDate attributes in enabled RuleGroup elements. startDates and endDates are inclusive. Whether or not an applicable rule is actually used depends on its order relative to other rules and the constraints it specifies for matching line items.</p>
        <p><strong>For more details:</strong> <a href="https://apidocs.cloudhealthtech.com/#price-book_introduction-to-price-book-api" target="_blank" style="color: #4ca1af;">API Documentation</a></p>
      `;
    });

    window.closeModal = function () {
        document.getElementById('infoModal').style.display = 'none';
    };
});
