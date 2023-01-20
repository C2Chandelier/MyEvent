<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230120113244 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE sortie (id INT AUTO_INCREMENT NOT NULL, owner_id_id INT NOT NULL, event_id INT NOT NULL, visibility TINYINT(1) NOT NULL, INDEX IDX_3C3FD3F28FDDAB70 (owner_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sorties_participants (id INT AUTO_INCREMENT NOT NULL, sortie_id_id INT NOT NULL, user_id_id INT NOT NULL, INDEX IDX_BB662DECE64A3B53 (sortie_id_id), INDEX IDX_BB662DEC9D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE sortie ADD CONSTRAINT FK_3C3FD3F28FDDAB70 FOREIGN KEY (owner_id_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE sorties_participants ADD CONSTRAINT FK_BB662DECE64A3B53 FOREIGN KEY (sortie_id_id) REFERENCES sortie (id)');
        $this->addSql('ALTER TABLE sorties_participants ADD CONSTRAINT FK_BB662DEC9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sortie DROP FOREIGN KEY FK_3C3FD3F28FDDAB70');
        $this->addSql('ALTER TABLE sorties_participants DROP FOREIGN KEY FK_BB662DECE64A3B53');
        $this->addSql('ALTER TABLE sorties_participants DROP FOREIGN KEY FK_BB662DEC9D86650F');
        $this->addSql('DROP TABLE sortie');
        $this->addSql('DROP TABLE sorties_participants');
    }
}
