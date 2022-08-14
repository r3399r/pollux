DROP VIEW IF EXISTS v_bank;
CREATE VIEW v_bank AS with tmp as (
    select bank_id,
        count(question_id) as count
    from bank_question bq
        left join question on bq.question_id = question.id
    group by bank_id
)
select bank.id,
    bank.name,
    bank.user_id,
    ifnull(tmp.count, 0) as question_count,
    bank.date_created,
    bank.date_updated
from bank
    left join tmp on bank.id = tmp.bank_id;