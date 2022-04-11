-- Os tipos de transações são:
-- 1: depósito
-- 2: saque
-- 3: transferência recebida
-- 4: transferência enviada

SELECT
	FORMAT(transactions.transaction_date, 'yyyy-MM') as month,
	accounts.first_name, 
	accounts.last_name,
    SUM(case when transaction_type = 1 OR transaction_type = 3 then transaction_amount else 0 end) as entry_total,
    SUM(case when transaction_type = 2 OR transaction_type = 4 then transaction_amount else 0 end) as exit_total
FROM
	transactions
	INNER JOIN
	    accounts
	    ON 
		    transactions.account_id = accounts.account_id
WHERE
	YEAR(transactions.transaction_date) = YEAR(GETDATE())
GROUP BY
    FORMAT(transactions.transaction_date, 'yyyy-MM'), first_name, last_name;