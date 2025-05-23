// Add Rule Group Button
function addRuleGroup(afterElement = null, insertAtTop = false) {
    const div = document.createElement('div');
    div.className = 'ruleGroup';
    div.innerHTML = `
        <div class="section-title">Rule Group</div>
        <div class="flex-container">
            <div class="flex-item">
                <label>Start Date:</label>
                <input type="date" class="startDate" required />
            </div>
            <div class="flex-item">
                <label>End Date (optional):</label>
                <input type="date" class="endDate" />
            </div>
            <div class="flex-item">
                <label>Enabled:</label>
                <select class="enabled">
                    <option value="true" selected>true</option>
                    <option value="false">false</option>
                </select>
            </div>
        </div>
        <div class="flex-container">
            <div class="flex-item">
                <label>Billing Rule Name:</label>
                <input type="text" class="ruleName" placeholder="Enter Billing Rule name" />
            </div>
        </div>
        <div class="flex-container">
            <div class="flex-item">
                <label>Billing Adjustment:</label>
                <input type="number" class="billingAdjustment" placeholder="e.g. 0.00"/>
            </div>
            <div class="flex-item">
                <label>Billing Rule Type:</label>
                <select class="billingRuleType">
                    <option value="percentDiscount">percentDiscount</option>
                    <option value="percentIncrease">percentIncrease</option>
                    <option value="fixedRate">fixedRate</option>
                </select>
            </div>
            <div class="flex-item">
                <label>Include Data Transfer:</label>
                <select class="includeDataTransfer">
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
            </div>
            <div class="flex-item">
                <label>Include RI Purchases:</label>
                <select class="includeRIPurchases">
                    <option value="true">true</option>
                    <option value="false" selected>false</option>
                </select>
            </div>
        </div>
        <div class="flex-container">
            <div class="flex-item">
                <label>Product Name:</label>
                <input type="text" class="productName" list="productList" placeholder="Leave empty for Any Products" />
            </div>
            <div class="flex-item">
                <label>Product Include Data Transfer:</label>
                <select class="productIncludeDataTransfer">
                    <option value="">(inherit)</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
            </div>
            <div class="flex-item">
                <label>Product Include RI Purchases:</label>
                <select class="productIncludeRIPurchases">
                    <option value="">(inherit)</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
            </div>
        </div>
        <div class="flex-container">
            <div class="flex-item">
                <label>Region (optional):</label>
                <input type="text" class="region" />
            </div>
        </div>
        <div class="rules"></div>
        <div class="sub-group usageTypes">
            <label>Usage Types:</label>
            <div class="usageTypesContainer"></div>
            <div class="sub-entry">
                <button class="addUsageType" type="button" onclick="addUsageType(this)">+</button>
            </div>
        </div>
        <div class="sub-group operations">
            <label>Operations:</label>
            <div class="operationsContainer"></div>
            <div class="sub-entry">
                <button class="addOperation" type="button" onclick="addOperation(this)">+</button>
            </div>
        </div>
        <div class="sub-group recordTypes">
            <label>Record Types:</label>
            <div class="recordTypesContainer"></div>
            <div class="sub-entry">
                <button class="addRecordType" type="button" onclick="addRecordType(this)">+</button>
            </div>
        </div>
        <div class="sub-group instanceProperties">
            <label>Instance Properties:</label>
            <div class="instancePropertiesContainer"></div>
            <div class="sub-entry">
                <button class="addInstanceProperty" type="button" onclick="addInstanceProperty(this)">+</button>
            </div>
        </div>
        <div class="sub-group lineItemDescriptions">
            <label>Line Item Descriptions:</label>
            <div class="lineItemDescriptionsContainer"></div>
            <div class="sub-entry">
                <button class="addLineItem" type="button" onclick="addLineItemDescription(this)">+</button>
            </div>
        </div>
        <div class="sub-group savingsPlanOfferingTypes">
            <label>Savings Plan Offering Types:</label>
            <div class="savingsPlanOfferingTypesContainer"></div>
            <div class="sub-entry">
                <button class="addSavingsPlanOfferingType" type="button" onclick="addSavingsPlanOfferingType(this)">+</button>
            </div>
        </div>
        <div class="flex-item">
            <label>Optional Parameters:</label>
            <select class="optional-parameters" onchange="addOptionalParameter(this)">
                <option value="">Select Parameter</option>
                <option value="usageTypes">Usage Types</option>
                <option value="operations">Operations</option>
                <option value="recordTypes">Record Types</option>
                <option value="instanceProperties">Instance Properties</option>
                <option value="lineItemDescriptions">Line Item Descriptions</option>
                <option value="savingsPlanOfferingTypes">Savings Plan Offering Types</option>
            </select>
        </div>
        <button class="remove-rule-btn" onclick="this.parentElement.remove()">Remove Billing Rule</button>
    `;
    rulesContainer.appendChild(div);
}

function addOptionalParameter(selectElement) {
    const value = selectElement.value;
    if (value) {
        const container = selectElement.closest('.ruleGroup').querySelector(`.${value}`);
        container.style.display = 'block';
        selectElement.value = ''; // Reset dropdown
    }
}

function addUsageType(button) {
    const container = button.closest('.sub-group').querySelector('.usageTypesContainer');
    const div = document.createElement('div');
    div.className = 'sub-entry';
    div.innerHTML = `
        <button type="button" class="remove-btn remove-usagetype" onclick="this.parentElement.remove()">×</button>
        <input type="text" class="usageTypeName" placeholder="UsageType name..." />
    `;
    container.appendChild(div);
}

function addLineItemDescription(button) {
    const container = button.closest('.sub-group').querySelector('.lineItemDescriptionsContainer');
    const div = document.createElement('div');
    div.className = 'sub-entry';
    div.innerHTML = `
        <button type="button" class="remove-btn remove-lineitem" onclick="this.parentElement.remove()">×</button>
        <select class="lineItemType">
            <option value="contains">contains</option>
            <option value="startsWith">startsWith</option>
            <option value="matchesRegex">matchesRegex</option>
        </select>
        <input type="text" class="lineItemValue" placeholder="Enter LineItem Description..." />
    `;
    container.appendChild(div);
}

function addOperation(button) {
    const container = button.closest('.sub-group').querySelector('.operationsContainer');
    const div = document.createElement('div');
    div.className = 'sub-entry';
    div.innerHTML = `
        <button type="button" class="remove-btn remove-lineitem" onclick="this.parentElement.remove()">×</button>
        <input type="text" class="operationName" placeholder="Enter Operation name..." />
    `;
    container.appendChild(div);
}

function addRecordType(button) {
    const container = button.closest('.sub-group').querySelector('.recordTypesContainer');
    const div = document.createElement('div');
    div.className = 'sub-entry';
    div.innerHTML = `
        <button type="button" class="remove-btn remove-lineitem" onclick="this.parentElement.remove()">×</button>
        <input type="text" class="recordTypeName" placeholder="Enter RecordType..." />
    `;
    container.appendChild(div);
}

function addInstanceProperty(button) {
    const container = button.closest('.sub-group').querySelector('.instancePropertiesContainer');
    const div = document.createElement('div');
    div.className = 'sub-entry';
    div.innerHTML = `
        <button type="button" class="remove-btn remove-lineitem" onclick="this.parentElement.remove()">×</button>
        <input type="text" class="instanceType" placeholder="Instance Type (e.g., t2)" />
        <input type="text" class="instanceSize" placeholder="Instance Size (e.g., 8xlarge)" />
        <div class="checkbox-wrapper">
            <input type="checkbox" class="reservedInstance" id="reservedInstance" />
            <label for="reservedInstance" class="checkbox-label"> Reserved</label>
        </div>
    `;
    container.appendChild(div);
}

function addSavingsPlanOfferingType(button) {
    const container = button.closest('.sub-group').querySelector('.savingsPlanOfferingTypesContainer');
    const div = document.createElement('div');
    div.className = 'sub-entry';
    div.innerHTML = `
        <button type="button" class="remove-btn remove-lineitem" onclick="this.parentElement.remove()">×</button>
        <input type="text" class="savingsPlanOfferingTypeName" placeholder="Enter Savings Plan Offering Type..." />
    `;
    container.appendChild(div);
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
