#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>

using namespace std;


int timeRequiredToBuy(const vector<int>& tickets, int k) {
    int total_time = 0;
    int tickets_k = tickets[k];

    for (int i = 0; i < tickets.size(); ++i) {
        if (i <= k) {
            total_time += min(tickets[i], tickets_k);
        } else {
            total_time += min(tickets[i], tickets_k - 1);
        }
    }
    
    return total_time;
}

int main() {
    vector<int> tickets;
    string line;

    cout << "Enter the number of tickets for each person, separated by spaces: ";
    getline(cin, line);

    stringstream ss(line);
    int num_tickets;
    while (ss >> num_tickets) {
        tickets.push_back(num_tickets);
    }

    if (tickets.empty()) {
        cerr << "Error: No ticket counts were entered." << endl;
        return 1;
    }

    int k;
    cout << "Enter the position (0-indexed) of the person of interest: ";
    cin >> k;

    if (k < 0 || k >= tickets.size()) {
        cerr << "Error: The position k=" << k << " is invalid for a line of " << tickets.size() << " people." << endl;
        return 1;
    }

    int result = timeRequiredToBuy(tickets, k);

    cout << "\nResult:" << endl;
    cout << "The time taken for the person at position " << k << " to finish is: " << result << " seconds." << endl;

    return 0;
}