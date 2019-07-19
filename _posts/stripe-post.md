[Stripe](https://stripe.com) recently introduced a new service called [chargeback protection](https://stripe.com), and I found myself fascinated by the logistics of such a feature. I thought it was the result of a deep understanding and application of engineering, economics, finance, and mathematics, so I decided to explore it a bit more. In this blog post, I'll  walk through the costs of a hypothetical business adding chargeback protection. I'll also mention pain points they can get rid of and risks they incur with adding this service.

#### The precursor: What costs are associated with Stripe?

Internet businesses use Stripe to process payments from their customers, abstracting away the work required to deal with accepting various payment methods, credit card processing, dealing with banks, authorization, settlements, and refunds. Essentially, you pay Stripe a per-transaction fee, write a couple lines of code to integrate with them, and they will handle all that for you.

The standard Stripe fee is $$ 2.9 \%$$ of the amount charged to the consumer, plus a flat fee of $$ $.30$$ per transaction .Say that a company does $$$D$$ in volume per year, coming from a total of $$C$$ card charges. Then, for one transaction, they'll pay $$ 0.30 + .029(D/C) $$, since $$ D/C $$ is the average dollar amount per transaction. Thus, for $$ C $$ transactions, they'll pay $$ 0.30C + .029(D)$$ in fees to Stripe. The ratio of fees paid to volume sold per year would then be $$ \frac{.30(C) + .029(D)}{D}$$ 

Putting some concrete numbers here, let's say tha a company sells 1 million in goods in one year, with a total of 100,000 successful credit card charges. Then, they'll pay $$ .30(100,000) + .029(1,000,000) \approx{} $59,000 $$ to Stripe, which is a ratio $$ \frac{.30(100,000) + .029(1,000,000)}{1,000,000} \approx  5.9\%$$ of their total revenues. (As an aside, we can see why many smaller businesses have a policy of accepting credit cards only for purchases greater than a certain dollar value, since Stripe's charging model)

The crux of this post has to do with chargeback protection: a recently-released feature that can be opted in to, for an additional per-transaction fee. 

##### But what are chargebacks, and why might businesses want to be protected from them?

[Chargebacks](https://chargebacks911.com/chargebacks/#cbCostsMerchants) are a direct demand from the bank behind the credit card to forcibly reverse a certain transcation. This is distinct from a *refund*, where a consumer asks the merchant to reverse the transaction.

Chargebacks can be initiated in several ways, but a common one is by someone complaining that their credit card was fradulently used at the merchant. If the bank determines that this claim has merit, the bank will issue a chargeback and forcibly remove the money from the merchant account. Credit card companies can be quite liberal with issuing chargebacks, as they are on the customer's side: they want the consumer to keep using their card.

On addition to losing the value of the item sold, chargebacks also have various processing fees and fines associated with them. It's [estimated that every dollar charged back actually costs the merchant 2.40](https://www.verifi.com/in-the-news/much-chargeback-fee/), so these are significant. It's also possible to dispute these chargebacks, which carry their own costs of having to spend time gathering evidence, dealing with the credit card company, and possibly even seeking legal counsel.

Obviously, chargebacks carry a large risk for merchants - money that was thought to be secured could be lost at a moment's notice if the transaction was indeed fradulent. Stripe's chargeback protection solution offers a sort of insurance for this risk: for a fee, Stripe will handle all costs and logistics related to chargebacks, so the merchant doesn't lose money or spend time when a chargeback does occur.

Stripe's goal is to utilize the data from their card network to improve their machine learning system , Radar, so that the vast majority of fradulent transactions are blocked during checkout, and thus are never approved, and never reach the chargeback state. With a low enough *false negative* rate - meaning that only very few fradulent transactions are let through by Radar - Stripe hopes to make money by charging a small, per-transaction fee. Optimizing Radar's false negative rate is thus important for Stripe, since each false negative will likely result in a chargeback, and Stripe has to eat the cost of that.

##### What do merchants need to think about when deciding to use chargeback protection?

A merchant should consider their losses due to chargebacks to determine if they need chargeback protection. Clearly, if a merchant has $$ 0 $$ or almost $$ 0 $$ chargebacks historically, and does not foresee any volatility, then there's no need to pay an extra cost for chargeback protection.

But most merchants aren't in this lucky position, and have to spent some amount per year on chargebacks. Let's call this variable $$ B $$. Then, if the total fees incurred due to chargeback protection is less than $$ B $$, we should use chargeback protection. Let's consider the same case as described in the precursor, then the total revenue is $$D $$, so our rule is to use chargeback protection when $$ 0.004D  < B $$.

This isn't helpful until we have a way of determining how much we spend on chargebacks, so we now seek an approximation for $$ B$$. Of course, if we've been monitoring chargeback costs in the past, we could simply use the sample mean of our chargeback costs for $$ B$$, or possibly a lower value to hedge against increased volatility T.he more years we've been measuring our chargeback costs, the better our estimate $$ B $$ likely is.

Let's consider the more interesting case where we *don't* have this data (perhaps our business is just starting out, or we neglected to log these costs previously). Then, we'd be interested in approximating the total cost we might spend on chargebacks, based on some assumptions about our business.

Concretely, let's assume that each successful transaction actually has a probability $$ \gamma $$ of being chargedback, so that we'd lose the money on it, plus additional fees. To simplify things, let's use the assumption that chargebacks cost us $$ 2.4 $$ times the cost of the good. 

Then, the expected value we'd spend on chargebacks will be a sum over all the transactions:

$$ E[B] = \sum_{i=1}^{C}2.4 \gamma C_i $$ where $$ C_i $$ denotes the monetary value of the $$i$$th transaction.

We can simplify this:

$$ E[B] = 2.4 \gamma \sum_{i=1}^{C}C_i $$



$$ c * $$ 

total cost on chargebacks = sum over goods sold: probability of chargeback * (cost of good sold + processing fees)

simplify this equation by taking out c, processing fees



In reality, the above equation isn't actually that simple. Notably, $$ c $$ is probably actually transaction-specific: orders from repeat customers would have a lower value for $$ c $$, for example.



Build graph with company risk level and dispute cost, since total dispute cost varies with how risky the merchant is rated



Another important fact: *variance*, or the volatility of your costs 

Another important factor is *abandonment rate*, or the ratio of buyers who exit without completing the transaction at some point in the checkout funnel. Cart abandonment occurs for many reasons:

- Consumer isn't quite ready to purchase the product
- Consumer decides that the price, or price of shipping is too high
- Added complexity due having to ship the good somewhere
- Website is slow, or down
- Consumer needs to create an account to continue checkout
- Checkout process doesn't support consumer's desired payment method
- Checkout process is too complex, confusing, or too much work



Internet businesses obviously care a lot about abandonment rate, and the last reason is what could possibly be impacted due to adding Stripe's chargeback protection. To offset increased risk, Stripe will show users it deems as risky an additional modal in the checkout flow, known as "3D Secure". The problem with this is of course false positives - you don't want to present these additional steps to a user who isn't fradulent, since that will reduce the chances of them completing the checkout.

Stripe is incredibly upfront about this, and even offers some advice [in their docs](https://stripe.com/docs/payments/3d-secure):

"

Although 3D Secure protects you from fraud, it requires your customers to complete additional steps during the payment process that could impact their checkout experience. For example, if a customer does not know their 3D Secure information, they might not be able to complete the payment.

When considering the use of 3D Secure, you might find the right balance is to use it only in situations where there is an increased risk of fraud, or if the customer’s card would be declined without it. In these cases, Stripe has default rules you can use to [trigger 3D Secure](https://stripe.com/docs/payments/3d-secure#three-ds-radar)." [1]

"

Abandonment rate could increase when a non-risky buyer is flagged by Stripe Radar's rules engine as risky. This would mean that a non-risky user would have to complete an extra authentication step, increasing both the complexity and amount of information needed to complete the checkout.

We're therefore interested in Stripe Radar's *false positive rate*- i.e. the probability that they flag a user as risky, given that they are not in fact risky. We're also intersted in the probability that such a user abandons their cart - let's call this probability $$ a $$. We'll further assume that $$ a $$ and $$ p $$ are independent, meaning that a user's risk profile doesn't influence their odds of abandonment. We'll also assume that $$ p $$ is the same for all users, namely that all users have the same likelihood of abandoning their cart. For each transaction, there is now an $$ ap $$ probability that we will not actually successfully sell the item. 

Let's subtract this off our total revenues:



[An interesting side note is the possible discrepancy here in what Stripe is interested in (from a strictly financial perspective) and what you as an internet business ower is interested in. You want low false positives, so that very few users are bothered with a worse checkout experience. Stripe wants low false negatives, so that their costs from dealing with your chargebacks are low. Obviously, Stripe is also intersted in providing a seamless checkout experience, so incentives here are not actually misaligned.]



It's also not immediately clear from [Stripe's description](https://stripe.com/radar/chargeback-protection) if chargeback protection must be enabled for *all* transactions, or if developers can programmatically choose wich transactions to enable protection for. If the latter was actually the case, the business could potentially try to reduce the number of transactions that are chargeback protected - for example, removing chargeback protection from repeat customers (as these are less likely to be fradulent), adding chargeback protection for international transactions (as these may be likelier to be fradulent), and adding chargeback protection for especially large transactions (to hedge against the possiblity of losing a large amount of money).

##### Summary

Currently, [most merchants prefer to deal with chargebacks and resolve disputes in-house](https://chargebacks911.com/chargebacks/#cbCostsMerchants). Stripe's chargeback protection service could potentially shift the paradigm, so that merchants begin to spend less time on resolving disputes with credit card companies, and instead focus on building a better business for their customers.