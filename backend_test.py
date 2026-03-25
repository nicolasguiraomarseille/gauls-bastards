#!/usr/bin/env python3
"""
GAULS BASTARDS Backend API Testing
Tests all backend endpoints for the motorcycle club website
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class GaulsBastardsAPITester:
    def __init__(self, base_url: str = "https://langue-learn-11.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name}: PASSED")
        else:
            print(f"❌ {name}: FAILED - {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details,
            "response_data": response_data
        })

    def test_health_endpoint(self):
        """Test /api/health endpoint"""
        try:
            response = requests.get(f"{self.api_url}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy" and "timestamp" in data:
                    self.log_test("Health Check", True, f"Status: {data['status']}", data)
                    return True
                else:
                    self.log_test("Health Check", False, f"Invalid response format: {data}")
                    return False
            else:
                self.log_test("Health Check", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Health Check", False, f"Request failed: {str(e)}")
            return False

    def test_api_root(self):
        """Test /api/ root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "GAULS BASTARDS" in data.get("message", ""):
                    self.log_test("API Root", True, f"Message: {data['message']}", data)
                    return True
                else:
                    self.log_test("API Root", False, f"Unexpected message: {data}")
                    return False
            else:
                self.log_test("API Root", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("API Root", False, f"Request failed: {str(e)}")
            return False

    def test_contact_form_submission(self):
        """Test /api/contact POST endpoint"""
        test_data = {
            "name": "Test Rider",
            "email": "test@example.com",
            "phone": "06 12 34 56 78",
            "message": "Salut les gars ! Je suis passionné de custom et j'aimerais rejoindre votre club. J'ai une Harley Street Bob et je roule depuis 10 ans."
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "message" in data:
                    self.log_test("Contact Form Submission", True, f"Success: {data['message']}", data)
                    return True
                else:
                    self.log_test("Contact Form Submission", False, f"Invalid response: {data}")
                    return False
            else:
                self.log_test("Contact Form Submission", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Request failed: {str(e)}")
            return False

    def test_contact_form_validation(self):
        """Test contact form validation with invalid data"""
        invalid_data = {
            "name": "A",  # Too short
            "email": "invalid-email",  # Invalid format
            "message": "Short"  # Too short
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/contact",
                json=invalid_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test("Contact Form Validation", True, "Validation errors caught correctly")
                return True
            else:
                self.log_test("Contact Form Validation", False, f"Expected 422, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form Validation", False, f"Request failed: {str(e)}")
            return False

    def test_contact_messages_retrieval(self):
        """Test /api/contact/messages GET endpoint"""
        try:
            response = requests.get(f"{self.api_url}/contact/messages", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Contact Messages Retrieval", True, f"Retrieved {len(data)} messages")
                    return True
                else:
                    self.log_test("Contact Messages Retrieval", False, f"Expected list, got: {type(data)}")
                    return False
            else:
                self.log_test("Contact Messages Retrieval", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Contact Messages Retrieval", False, f"Request failed: {str(e)}")
            return False

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test POST /api/status
        test_status = {
            "client_name": "test_client"
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/status",
                json=test_status,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("client_name") == "test_client" and "timestamp" in data:
                    self.log_test("Status Check Creation", True, f"Created status check for {data['client_name']}")
                else:
                    self.log_test("Status Check Creation", False, f"Invalid response: {data}")
                    return False
            else:
                self.log_test("Status Check Creation", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Status Check Creation", False, f"Request failed: {str(e)}")
            return False

        # Test GET /api/status
        try:
            response = requests.get(f"{self.api_url}/status", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Status Checks Retrieval", True, f"Retrieved {len(data)} status checks")
                    return True
                else:
                    self.log_test("Status Checks Retrieval", False, f"Expected list, got: {type(data)}")
                    return False
            else:
                self.log_test("Status Checks Retrieval", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Status Checks Retrieval", False, f"Request failed: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("🏍️  GAULS BASTARDS Backend API Testing")
        print("=" * 50)
        print(f"Testing API at: {self.api_url}")
        print()

        # Run tests in order
        self.test_health_endpoint()
        self.test_api_root()
        self.test_contact_form_submission()
        self.test_contact_form_validation()
        self.test_contact_messages_retrieval()
        self.test_status_endpoints()

        # Print summary
        print()
        print("=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return False

    def get_test_summary(self):
        """Get test summary for reporting"""
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "test_details": self.test_results
        }


def main():
    """Main test execution"""
    tester = GaulsBastardsAPITester()
    success = tester.run_all_tests()
    
    # Save test results
    summary = tester.get_test_summary()
    with open("/app/backend_test_results.json", "w") as f:
        json.dump(summary, f, indent=2, default=str)
    
    return 0 if success else 1


if __name__ == "__main__":
    sys.exit(main())